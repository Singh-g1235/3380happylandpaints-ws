const mongoose = require('mongoose')

const productDescriptionSchema = mongoose.Schema(
    {
        availableColours: String,
        sheen: String,
        cleanup: String,
        resinType: String,
        recommendedUse: String,
        mpiRating: String,
        vocLevel: String
        
    }, {
        versionKey: false 
    }
)
const productSchema = mongoose.Schema(
    {
        ProductId: String,
        ProductName: String,
        ProductQuantity: Number,
        ProductAmount: Number,
        ProductDescription: productDescriptionSchema,
        
        
    }, {
        versionKey: false 
    }
)

module.exports = mongoose.model("products", productSchema);