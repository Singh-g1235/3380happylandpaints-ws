const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
    {
        UserId: String,
        Password: String,
        FirstName: String,
        LastName: String,
        Mobile: Number,
        Unit: String,
        Zip: String,
        City: String,
        Province: String,
    }, {
        versionKey: false 
    }
)

module.exports = mongoose.model("user", userSchema);