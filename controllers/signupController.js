const SignUp = require("../models/signup");

exports.addUser = async (req, res) => {
  console.log("Received request to add User");
  try {
    //Talk to database
    var matchResult = await SignUp.insertMany({
      UserId: req.body.UserId,
      Password: req.body.Password,
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      City: req.body.City,
      Province: req.body.Province,
      Zip: req.body.Zip,
      Unit: req.body.Unit,
    });
    //console.log(matchResult);
    res.header("Content-Type", "application/json");
    console.log(matchResult);

    if (Array.isArray(matchResult)) {
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
