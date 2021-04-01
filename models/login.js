const mongoose=require('mongoose')

const loginSchema=mongoose.Schema(
    {
        UserId:String,
        Password:String
    },{
        versionKey:false//turn off mongo version.

    }
)

module.exports=mongoose.model("logins",loginSchema);