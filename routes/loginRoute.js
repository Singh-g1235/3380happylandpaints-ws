const express= require('express')
var router = express.Router()

var login = require('../controllers/loginController')

 router.post('/', login.matchUser)
 router.post('/user', login.addUser)

module.exports = router;