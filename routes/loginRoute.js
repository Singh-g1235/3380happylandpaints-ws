const express= require('express')
var router = express.Router()

var login = require('../controllers/loginController')

 router.post('/', login.matchUser)
 router.post('/user', login.addUser)
 router.get('/auth', login.authorize)

module.exports = router;