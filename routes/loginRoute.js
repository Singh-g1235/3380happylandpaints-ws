const express= require('express')
var router = express.Router()

var login = require('../controllers/loginController')

 router.post('/', login.matchUser)

module.exports = router;