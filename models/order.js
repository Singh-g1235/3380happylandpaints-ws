const mongoose = require('mongoose')

const productDetailsSchema = mongoose.Schema(
    {
        productId: String,
        productName: String,
        productQuantity: Number,
        productAmount: Number,
        
    }, {
        versionKey: false 
    }
)
const orderSchema = mongoose.Schema(
    {
        OrderId: String,
        UserId: String,
        OrderDate: Date,
        DeliveryDate: Date,
        ProductDetails: [productDetailsSchema],
        OrderAmount: Number,
        OrderStatus: String


    }, {
        versionKey: false 
    }
)

module.exports = mongoose.model("order", orderSchema);