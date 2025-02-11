package entity

import (
	"github.com/google/uuid"
	"time"
)

type Transaction struct {
	ID           string
	SellingOrder *Order
	BuyingOrder  *Order
	Shares       int
	Price        float64
	Total        float64
	DateTime     time.Time
}

func NewTransaction(sellingOrder *Order, buyingOrder *Order, price float64, total float64) *Transaction {
	return &Transaction{
		ID:           uuid.NewString(),
		SellingOrder: sellingOrder,
		BuyingOrder:  buyingOrder,
		Price:        price,
		Total:        total,
		DateTime:     time.Now(),
	}
}
