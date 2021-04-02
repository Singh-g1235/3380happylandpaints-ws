const mongoose=require('mongoose')

const signupSchema=mongoose.Schema(
    {
        FirstName:{type:String, required:true},
        LastName:{type:String, required:true},
        UserId:{type:String, required:true},
        Password:{type:String, required:true},
        Unit:{type:String, required:true},
        City:{type:String, required:true},
        Province:{type:String, required:true},
        Zip:{type:String, required:true},
        Role:{type:String, default:"customer"}
    },{
        versionKey:false//turn off mongo version.

    }
)

module.exports=mongoose.model("signups",signupSchema);