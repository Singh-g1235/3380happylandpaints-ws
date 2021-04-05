const SignUp = require("../models/signup");

var signedUser="";
var bcrypt = require("bcryptjs");
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

exports.getUser = async (req, res) => {
  console.log("Received request to add User");
  try {
    //set signed user.
    signedUser=req.body.UserId;
  
    var matchResult = await SignUp.find({ UserId: req.body.UserId });
    console.log(matchResult.Password);
    res.header("Content-Type", "application/json");
    //console.log(matchResult);
    // if the user us signed up succesfully then issue a token.
    if (Array.isArray(matchResult)) {
      res.send(matchResult);
    } else {
      res.send(null);
    }
  } catch {
    //Do something with failure
    res.status(500);
    res.send({ error: "The was a problem adding user" });
  }
};

exports.updateUser = async (req, res) => {
  console.log("Received request to Update User");
  try {

    var hashedPassword = bcrypt.hashSync(req.body.Password, 8);
    let options = { upsert: true, new: true, setDefaultsOnInsert: true };
    var user = {
      UserId: req.body.UserId,
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      City: req.body.City,
      Zip: req.body.Zip,
      Unit: req.body.Unit,
      Province: req.body.Province,
      Password: hashedPassword,
    };

    updatedResult = await SignUp.findOneAndUpdate(
      { UserId: req.body.UserId },
      user,
      options
    );
    res.status(200);
    res.header("Content-Type", "application/json");
    res.send({message:"Profile Updated"});
  } catch {
    res.status(500);
    res.send({ message: `Error in Updating User with id ${signedUser}` });
  }
};
