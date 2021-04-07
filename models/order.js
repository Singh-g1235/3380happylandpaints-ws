const mongoose = require('mongoose')


const orderSchema = mongoose.Schema(
    {
        OrderId: String,
        UserId: String,
        OrderAmount: Number,
        OrderStatus: String,
        ProductId: String,
        ProductName: String,
        ProductQuantity: Number,
        ProductAmount: Number

    }, {
        versionKey: false 
    }
)

module.exports = mongoose.model("order", orderSchema);