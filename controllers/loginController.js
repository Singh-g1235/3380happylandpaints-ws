const Login = require("../models/login");

var loggedUser = "";
//Add in bcrpyt, jsonwebtoken, and config file(for the private key).
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var config = require("../config");

exports.matchUser = async (req, res) => {
  console.log("Received request to validate user login");
  try {
    //authentication.

    Login.findOne(
      { UserId: req.body.UserId, Role: req.body.Role },
      function (err, user) {
        //if the there is no match then.
        if (!user) return res.status(404).send({ auth: false });

        //if there is a mathc then is the passwod is correct.
        var passwordIsValid = bcrypt.compareSync(
          req.body.Password,
          user.Password
        );

        //if password is wrong then..
        if (!passwordIsValid)
          return res.status(401).send({ auth: false, token: null });

        // if there is great Success!! then..

        var token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 30000, // expires in 50 mins
        });
        //send the token to client.
        res.status(200).send({ auth: true, token: token });
      }
    );
  } catch {
    //Do something with failure
    res.status(500);
    res.send({ error: "The user is not authorized" });
  }
};

exports.addUser = async (req, res) => {
  //when the user use sign up then take the credentials and
  //put them to logins tables.
  console.log("Recieved request to add new user to login");

  var hashedPassword = bcrypt.hashSync(req.body.Password, 8);

  var role="customer";
  //if the user is admin then change the role.
  if(req.body.UserId === "admin")
  {
    role="admin";
  }

  Login.create(
    {
      UserId: req.body.UserId,
      Password: hashedPassword,
      Role: role,
    },
    function (err, user) {
      if (err) return res.status(500).send({ auth: false });
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 30000, // expires in 50 mins
      });
      res.status(200).send({ auth: true, token: token });
    }
  );
};

exports.authorize = async function (req, res) {
  console.log("in the authorization");
  var token = req.headers["x-access-token"];
  //No Token, No Soup!
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  //Verify the JWT token with the jsonwebtoken library
  jwt.verify(token, config.secret, function (err, decoded) {
    //Bad Token, No Soup!
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    //Its Valid, dont send it back but, check there is a valid user

    //res.status(200).send(decoded);
    Login.findById(decoded.id, { password: "" }, function (err, user) {
      if (err)
        return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");
      loggedUser = user;
      res.status(200).send(user);
    });
  });
};

exports.User = loggedUser;
