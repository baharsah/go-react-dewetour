package handlers

import (
	resultDito "baharsah/dito/result"
	transactionsdito "baharsah/dito/transactions"
	"baharsah/models"
	"baharsah/repo"
	"encoding/json"
	"math/rand"
	"os"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/gorilla/mux"
	midtrans "github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"

	"net/http"
)

type transactionRepoHandler struct {
	TRXRepo repo.TransactionRepo
}

func HandlerTransaction(TRXRepo repo.TransactionRepo) *transactionRepoHandler {
	return &transactionRepoHandler{TRXRepo}
}

func (h *transactionRepoHandler) SetTransaction(res http.ResponseWriter, req *http.Request) {

	// set header menjadi json

	res.Header().Set("Content-Type", "application/json")

	// memerifikasi apakah data dikirimkan sudah benar

	request := new(transactionsdito.TransactionsRequest)
	if err := json.NewDecoder(req.Body).Decode(request); err != nil {
		res.WriteHeader(http.StatusBadRequest)
		response := resultDito.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(res).Encode(response)
		return
	}

	// menjalankan validasi apakah data sudah sesuai dengan apa yang harus dikirimkan

	validation := validator.New()
	err := validation.Struct(request)

	if err != nil {
		res.WriteHeader(http.StatusBadRequest)
		response := resultDito.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(res).Encode(response)
		return
	}

	// membuat transaksi
	// disini kita akan menambahkan flow dimana kita akan mengirimkan midtransID kedalam database

	//disini kita meminta midtrans agar membuat pembayaran

	// TODO : Midtrans flow

	// var c = coreapi.Client{
	// 	ServerKey: os.Getenv("MDTRNS_SERVER_KEY"),
	// 	ClientKey: os.Getenv("MDTRNS_CLIENT_KEY"),
	// }

	// TODO : Creating Midtrans Tokens from snap request

	// 1. Initiate Snap client
	var s = snap.Client{}
	s.New(os.Getenv("MDTRNS_SERVER_KEY"), midtrans.Sandbox)

	// TODO: setup data

	TransactionId := strconv.Itoa(rand.Intn(10000) - rand.Intn(100))

	trxmodel := models.Transactions{
		UserID:        request.UserID,
		TripID:        request.TripID,
		PaymentStatus: 0,
		Quantity:      uint(request.Qty),
		MidtransID:    TransactionId,
	}

	// bagian ini akan membuat set kedalam database
	trx, err := h.TRXRepo.SetTransaction(trxmodel)
	if err != nil {
		res.WriteHeader(http.StatusInternalServerError)
		response := resultDito.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(res).Encode(response)
		return
	}
	// TODO : dapatkan metadata user

	// request token
	reqs := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  trxmodel.MidtransID,
			GrossAmt: int64((trx.Trips.Price * trxmodel.Quantity) * (100 / 11)),
		},
		CreditCard: &snap.CreditCardDetails{
			Secure: true,
		},
		CustomerDetail: &midtrans.CustomerDetails{
			FName: trx.User.Name,
			Email: trx.User.Email,
		},
	}

	// Execute request create Snap transaction to Midtrans Snap API
	snapResp, _ := s.CreateTransaction(reqs)

	res.WriteHeader(http.StatusOK)
	response := resultDito.SuccessResult{Code: http.StatusOK, Data: snapResp}
	json.NewEncoder(res).Encode(response)

	// TODO: Tampilkan Token

}

func (h *transactionRepoHandler) GetTransaction(res http.ResponseWriter, req *http.Request) {

	res.Header().Set("Content-Type", "application/json")
	iddata, _ := strconv.Atoi(mux.Vars(req)["id"])

	trxdata, err := h.TRXRepo.GetTransaction(iddata)
	if err != nil {
		res.WriteHeader(http.StatusInternalServerError)
		response := resultDito.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(res).Encode(response)
		return
	}
	response := resultDito.SuccessResult{Code: http.StatusOK, Data: trxdata}
	json.NewEncoder(res).Encode(response)

}

// TODO : Buat Notifikasi disini

func (h *transactionRepoHandler) Notification(res http.ResponseWriter, req *http.Request) {
	var notificationPayload map[string]interface{}

	err := json.NewDecoder(req.Body).Decode(&notificationPayload)
	if err != nil {
		res.WriteHeader(http.StatusBadRequest)
		response := resultDito.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()}
		json.NewEncoder(res).Encode(response)
		return
	}

	transactionStatus := notificationPayload["transaction_status"].(string)
	fraudStatus := notificationPayload["fraud_status"].(string)
	orderId := notificationPayload["order_id"].(string)

	// statuses
	// 1. Challenged
	// 2. success
	// 3. expired
	// 4. pending
	// 5. failure
	// 6. refunded

	if transactionStatus == "capture" {
		if fraudStatus == "challenge" {
			// TODO set transaction status on your database to 'challenge'
			h.TRXRepo.UpdateTransactionMidtrans(models.Transactions{MidtransID: orderId, PaymentStatus: 1})

		} else if fraudStatus == "accept" {
			// TODO set transaction status on your database to 'success'
			h.TRXRepo.UpdateTransactionMidtrans(models.Transactions{MidtransID: orderId, PaymentStatus: 2})

		}
	} else if transactionStatus == "settlement" {
		// TODO set transaction status on your databaase to 'success'
		h.TRXRepo.UpdateTransactionMidtrans(models.Transactions{MidtransID: orderId, PaymentStatus: 2})

	} else if transactionStatus == "deny" {
		// TODO you can ignore 'deny', because most of the time it allows payment retries
		// and later can become success
		h.TRXRepo.UpdateTransactionMidtrans(models.Transactions{MidtransID: orderId, PaymentStatus: 5})

	} else if transactionStatus == "cancel" || transactionStatus == "expire" {
		// TODO set transaction status on your databaase to 'failure'
		h.TRXRepo.UpdateTransactionMidtrans(models.Transactions{MidtransID: orderId, PaymentStatus: 5})

	} else if transactionStatus == "pending" {
		// TODO set transaction status on your databaase to 'pending' / waiting payment
		h.TRXRepo.UpdateTransactionMidtrans(models.Transactions{MidtransID: orderId, PaymentStatus: 4})

	}

	// sendmail by getting transactionID

	res.WriteHeader(http.StatusOK)
}

// TODO: kirim semua data trip berdasarkan userID disini

func (h *transactionRepoHandler) GetTransactions(res http.ResponseWriter, req *http.Request) {
	res.Header().Set("Content-Type", "application/json")
	// TODO disini
	trxs, err := h.TRXRepo.GetTransactions()
	if err != nil {
		res.WriteHeader(http.StatusInternalServerError)
		response := resultDito.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()}
		json.NewEncoder(res).Encode(response)
	}

	response := resultDito.SuccessResult{Code: http.StatusOK, Data: trxs}
	json.NewEncoder(res).Encode(response)
}
