package repo

import (
	"baharsah/models"
	"log"

	"gorm.io/gorm"
)

type TransactionRepo interface {
	// TODO modifikasi disini
	GetTransactions() ([]models.Transactions, error)
	GetTransaction(id int) (models.Transactions, error)
	// UpdateTransaction() (models.Transactions, error)
	SetTransaction(models.Transactions) (models.Transactions, error)
	UpdateTransactionMidtrans(models.Transactions) (tx, error)
}

func RepoTRX(db *gorm.DB) *repo {

	return &repo{db}

}

// TODO modifikasi disini
func (r *repo) GetTransactions() ([]models.Transactions, error) {
	var trxs []models.Transactions

	err := r.db.Debug().Preload("Trips").Preload("Trips.Country").Find(&trxs).Error

	return trxs, err

}

func (r *repo) GetTransaction(id int) (models.Transactions, error) {
	tx := models.Transactions{}
	err2 := r.db.Preload("Trips").Preload("Trips.Country").First(&tx, id).Error
	return tx, err2
}

func (r *repo) SetTransaction(trx models.Transactions) (models.Transactions, error) {

	err := r.db.Debug().Create(&trx).Error
	if err != nil {
		log.Println("error creating transaction")

		return trx, err
	}
	tx := models.Transactions{}

	err2 := r.db.Debug().Preload("User").Preload("Trips").Where("midtrans_id", trx.MidtransID).Find(&tx).Error
	log.Println("error loging transaction")

	return tx, err2

}

// statuses
// statuses
// 1. Challenged
// 2. success
// 3. expired
// 4. pending
// 5. failure
// 6. refunded

// TODO : buat update dan get by midtrans ID

func (r *repo) UpdateTransactionMidtrans(trx models.Transactions) (models.Transactions, error) {
	err := r.db.Debug().Where(models.Transactions{MidtransID: trx.MidtransID}).Updates(models.Transactions{PaymentStatus: trx.PaymentStatus}).Error
	var tx = models.Transactions{}

	_ = r.db.Debug().Preload("User", "name , email").Where(models.Transactions{MidtransID: trx.MidtransID}).First(&tx).Error

	return tx, err
}

func (r *repo) GetTransactionMidtrans(trx models.Transactions) (models.Transactions, error) {
	var tx = models.Transactions{}
	res := r.db.Debug().Preload("User", "name , email").Where(models.Transactions{MidtransID: trx.MidtransID}).First(&tx).Error
	return tx, res
}
