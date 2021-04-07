const express= require('express')
var router = express.Router()

var signUp = require('../controllers/signupController')

 router.post('/', signUp.addUser)
 router.post('/getUser', signUp.getUser)
 router.put('/updateUser', signUp.updateUser)

module.exports = router;