const SignUp = require("../models/signup");

var bcrypt = require('bcryptjs');
exports.addUser = async (req, res) => {
  console.log("Received request to add User");
  try {
    //encrpypt the password.
    var hashedPassword = bcrypt.hashSync(req.body.Password, 8);
    //Talk to database
    var matchResult = await SignUp.insertMany({
      UserId: req.body.UserId,
      Password: hashedPassword,
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      City: req.body.City,
      Province: req.body.Province,
      Zip: req.body.Zip,
      Unit: req.body.Unit,
    });
    //console.log(matchResult);
    res.header("Content-Type", "application/json");
    //console.log(matchResult);
   // if the user us signed up succesfully then issue a token.
    if (Array.isArray(matchResult)) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch {
    //Do something with failure
    res.status(500);
    res.send({ error: "The was a problem adding user" });
  }
};
