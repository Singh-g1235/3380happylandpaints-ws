const Login = require("../models/login");

exports.matchUser = async (req, res) => {
  console.log("Received request to validate user login");
  try {
    //Talk to database
    var matchResult = await Login.find({
      UserId: req.body.UserId,
      Password: req.body.Password,
    });
    //console.log(matchResult);
    res.header("Content-Type", "application/json");
    if (matchResult.length >= 1) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch {
    //Do something with failure
    res.status(500);
    res.send({ error: "The user is not authorized" });
  }
};

exports.addUser = async (req, res) => {
  console.log("Recieved request to add new user to login");

  try {
    var result = await Login.insertMany({
      UserId: req.body.UserId,
      Password: req.body.Password,
    });
    res.header("Content-Type", "application/json");

    if (result.length >= 1) {
        res.send(true);
      } else {
        res.send(false);
      }

  } catch {
    res.status(500);
    res.send({ error: "Cannot add user to login" });
  }
};
