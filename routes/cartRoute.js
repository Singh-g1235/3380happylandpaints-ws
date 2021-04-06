const { Router } = require('express');
const express = require('express');
var route = express.Router();

//Include the cart controller
cartController = require('../controllers/cartController');


//homepage route of add button to cart
route.post('/', cartController.addToCart)
route.get('/', cartController.getProducts)
route.delete('/checkout',cartController.deleteCart)
route.post('/orders',cartController.addToOrders)

//cart items route
route.get('/products', cartController.getLoadedCart)

route.delete('/product',cartController.deleteProduct)

//homepage route
route.get('/product', cartController.getProduct)


module.exports = route;