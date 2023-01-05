package models

type Transactions struct {
	ID            int `gorm:"primaryKey"`
	UserID        uint
	User          User `gorm:"foreignKey:UserID"`
	TripID        uint
	Trips         Trips `gorm:"foreignKey:TripID"`
	TransferProof string
	PaymentStatus int
	ApprovalID    int
	Quantity      uint
	MidtransID    string
}

// disini dikirim keluar
