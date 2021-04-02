const express= require('express')
var router = express.Router()

var signUp = require('../controllers/signupController')

 router.post('/', signUp.addUser)

module.exports = router;