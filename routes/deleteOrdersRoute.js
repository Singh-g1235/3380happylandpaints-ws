const express= require('express')
var router = express.Router()

var deleteOrders = require('../controllers/deleteOrdersController')

 router.get('/:UserId', deleteOrders.getUserOrders)
 router.post('/', deleteOrders.deleteOrder)

module.exports = router;