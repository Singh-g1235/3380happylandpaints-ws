const { Router } = require('express');
const express = require('express');
var route = express.Router();

//Include the admin controller
adminController = require('../controllers/adminController');

//routes
route.get('/products', adminController.getProducts)
route.get('/product/:productId', adminController.getProduct)
route.post('/product', adminController.addProduct)
route.put('/product',adminController.updateProduct)
route.delete('/product',adminController.deleteProduct)

route.get('/users', adminController.getUsers)
route.get('/user/:userId', adminController.getUser)
route.post('/user', adminController.addUser)
route.put('/user',adminController.updateUser)
route.delete('/user',adminController.deleteUser)

route.get('/orders', adminController.getOrders)
route.get('/order/:orderId', adminController.getOrder)
route.put('/order',adminController.shipOrder)

module.exports = route;
