const Login = require("../models/login");

//Add in bcrpyt, jsonwebtoken, and config file(for the private key).
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

exports.matchUser = async (req, res) => {
  console.log("Received request to validate user login");
  try {
    //authentication.

    Login.findOne({  UserId: req.body.UserId,  Role:req.body.Role}, function (err, user) {
     
      //if the there is no match then.
      if (!user) return res.status(404).send({auth:false});
      
      //if there is a mathc then is the passwod is correct.
      var passwordIsValid = bcrypt.compareSync(req.body.Password, user.Password);
      
      //if password is wrong then..
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      
      // if there is great Success!! then..

      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      //send the token to client.
      res.status(200).send({ auth: true, token: token });
    });


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
    
    Login.create({ 
        UserId: req.body.UserId,
        Password: hashedPassword,
        Role:"customer"
    },
    function (err, user) {

      if (err) return res.status(500).send({auth:false})
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    }); 

  
};
