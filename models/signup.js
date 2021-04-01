const mongoose=require('mongoose')

const signupSchema=mongoose.Schema(
    {
        FirstName:String,
        LastName:String,
        UserId:String,
        Password:String,
        Unit:String,
        City:String,
        Province:String,
        Zip:String
    },{
        versionKey:false//turn off mongo version.

    }
)

module.exports=mongoose.model("signup",signupSchema);