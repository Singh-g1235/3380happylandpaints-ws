const mongoose = require('mongoose')

const cartDetailsSchema = mongoose.Schema(
    {
        ProductId: String,
        ProductName: String,
        ProductQuantity: Number,
        ProductAmount: Number
        
    }, {
        versionKey: false 
    }
)


module.exports = mongoose.model("carts", cartDetailsSchema);