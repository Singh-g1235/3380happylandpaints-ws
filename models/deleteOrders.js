const mongoose=require('mongoose')

const deleteOrderSchema=mongoose.Schema(
    {
        UserId:String,
        OrderId:String,
        
    },{
        versionKey:false//turn off mongo version.

    }
)

module.exports=mongoose.model("orders",deleteOrderSchema);