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
        orderId: String,
        userId: String,
        oderDate: Date,
        deliveryDate: Date,
        productDetails: productDetailsSchema,
        orderAmount: Number,
        orderStatus: String


    }, {
        versionKey: false 
    }
)

module.exports = mongoose.model("order", orderSchema);