const mongoose = require('mongoose')

const productDescriptionSchema = mongoose.Schema(
    {
        availableColours: {type:String, required:true},
        sheen: {type:String, required:true},
        cleanup: {type:String, required:true},
        resinType: {type:String, required:true},
        recommendedUse: {type:String, required:true},
        mpiRating: {type:String, required:true},
        vocLevel: {type:String, required:true}
        
    }, {
        versionKey: false 
    }
)
const productSchema = mongoose.Schema(
    {
        ProductId: {type:String, required:true},
        ProductName: {type:String, required:true},
        ProductQuantity: {type:Number, required:true},
        ProductAmount: {type:Number, required:true},
        ProductDescription: productDescriptionSchema,
        
        
    }, {
        versionKey: false 
    }
)

module.exports = mongoose.model("products", productSchema);