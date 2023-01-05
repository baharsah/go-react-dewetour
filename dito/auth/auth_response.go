package authdito

type RegisterResponse struct {
	Code    int
	message string
}

type LoginResponse struct {
	Id       int    `gorm:"type: int" json:"id"`
	Email    string `gorm:"type : varchar(255)" json:"email" validate:"required"`
	Password string `gorm:"type : varchar(255)" json:"password" validate:"required"`
	Token    string `gorm:"type : varchar(255)" json:"token"`
	IsAdmin  int    `json:"is_admin"`
}

type CheckAuthResponse struct {
	Id     int    `gorm:"type: int" json:"id"`
	Name   string `gorm:"type: varchar(255)" json:"name"`
	Email  string `gorm:"type: varchar(255)" json:"email"`
	Status int    `gorm:"type: varchar(50)"  json:"is_admin"`
}
