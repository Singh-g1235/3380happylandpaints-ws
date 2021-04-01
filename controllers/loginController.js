
const Login=require("../models/login")

exports.matchUser = async (req, res) => {
    console.log("Received request to validate user login")
    try {
        //Talk to database
        var matchResult = await Login.find({"UserId":req.body.UserId,
        "Password":req.body.Password});
        //console.log(matchResult);
        res.header("Content-Type", "application/json");
        if(matchResult.length>=1)
        {
            res.send(true)
        }
        else{
            res.send(false)

        }
    } catch {
        //Do something with failure
        res.status(500);
        res.send({ error: "The user is not authorized" })
    }
}
