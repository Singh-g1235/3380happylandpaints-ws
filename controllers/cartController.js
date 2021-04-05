const Cart = require("../models/cart")
const Product = require("../models/product")

exports.addToCart = async (req, res) => {

    try {

        var cartItem = await Cart.findOne({ ProductId: req.body.ProductId }).exec();
        var productItem = await Product.findOne({ ProductId: req.body.ProductId }).exec();
        console.log("Line 11 - > " + cartItem)
        if (!cartItem) {
            console.log("In null")
            var product = {
                "ProductId": req.body.ProductId,
                "ProductName": req.body.ProductName,
                "ProductQuantity": 1,
                "ProductAmount": req.body.ProductAmount
            }
            var newInventoryItem = {...productItem, ProductQuantity : productItem.ProductQuantity--}
            console.log(
                "ProductId -> " +  req.body.ProductId + 
                "ProductName -> "+ req.body.ProductName+
                "ProductQuantity -> "+ 1+
                "ProductAmount -> "+ req.body.ProductAmount
            )
            var newCartItem = new Cart(product)
            await newCartItem.save();
            res.status(200)
            
            console.log(product);
        }
        else {
            var updatedItem = {
                "ProductId": req.body.ProductId,
                "ProductName": req.body.ProductName,
                "ProductQuantity": ++cartItem.ProductQuantity,
                "ProductAmount": cartItem.ProductAmount + req.body.ProductAmount
            }
            let options = { upsert: true, new: true, setDefaultsOnInsert: true };
            updatedItemResult = await Cart.findOneAndUpdate({ ProductId: req.body.ProductId }, updatedItem, options);
            console.log(updatedItemResult);
        }
        var productItem = await Product.findOne({ ProductId: req.body.ProductId }).exec();
        let options = { upsert: true, new: true, setDefaultsOnInsert: true };
        var newInventoryItem = {...productItem, ProductQuantity : productItem.ProductQuantity--}
        newUpdatedInventoryItem = await Product.findOneAndUpdate({ ProductId: req.body.ProductId}, newInventoryItem, options)

    } catch {
        res.status(500)
        res.send({ message: `Error in Adding Product with product id ${req.body.ProductId} to the cart` })

    }

}
exports.deleteProduct = async (req, res) => {

    try {
        deletedProductResult = await Cart.deleteOne({ ProductId: req.body.ProductId })
        if(!deletedProductResult){
            res.status(404);
            res.header("Content-Type", "application/json");
            res.send({ message: `Product Not Found ${req.body.ProductId}` })
        } else{
            res.status(200)
            res.send(deletedProductResult);
        }
        console.log("in the delete")


    } catch {
        res.status(500)
        res.send({ message: `Error in Deleting Product with product id ${req.body.ProductId}` })

    }
}

exports.getLoadedCart = async (req, res) => {

    try {
        var cartList = await Cart.find();
        if (!cartList) {
            res.status(404);
            res.header("Content-Type", "application/json");
            res.send({ message: `Could not find cart` })
            res.send(cartList)

        } else {
            res.status(200);
            res.header("Content-Type", "application/json");
            res.send(cartList)
        }
    } catch {
        res.status(500);
        res.send({ error: "Cart is empty" })
    }
}


exports.getProduct = async (req, res) => {

    try {
        var product = await Product.findOne({ ProductId: req.body.productId }).exec();

        if (!product) {
            res.status(404);
            res.header("Content-Type", "application/json");
            res.send({ message: `Could not find ${req.body.productId}` })

            res.send(product)

        } else {
            res.status(200);
            res.header("Content-Type", "application/json");

            res.send(product)
        }
    } catch (err) {
        res.status(500);
        res.header("Content-Type", "application/json");
        res.send({ message: `Error in finding : ${req.body.productId} . ${err.stack}` })

    }
}


exports.updateProduct = async (req, res) => {


    try {
        let options = { upsert: true, new: true, setDefaultsOnInsert: true };
        var product = await Product.findOne({ ProductId: req.body.productId }).exec();
        product.ProductQuantity--;


        updatedProductResult = await Product.findOneAndUpdate({ ProductId: req.body.ProductId }, product, options);
        res.status(200)
        res.header("Content-Type", "application/json")
        res.send(updatedProductResult);


    } catch {
        res.status(500)
        res.send({ message: `Error in Updating Product with product id ${req.body.ProductId}` })

    }
}

exports.getProducts = async (req, res) => {

    try {
        var productList = await Product.find();
       
        if (!productList) {
            res.status(404);
            res.header("Content-Type", "application/json");
            res.send({ message: `Could not find products` })
            res.send(productList)

        } else {
            res.status(200);
            res.header("Content-Type", "application/json");
            res.send(productList)
        }
    } catch {
        res.status(500);
        res.send({ error: "The Vendor did not supply products..." })
    }
}

exports.deleteCart = async (req, res) => {

    try {
        deleteCart= await Cart.deleteMany({})
        if(!deleteCart){
            res.status(404);
            res.header("Content-Type", "application/json");
            res.send({ message: `Cart not cleared` })
        } else{
            res.status(200)
            res.send(deleteCart);
        }
        console.log("in the delete")


    } catch {
        res.status(500)
        res.send({ message: `Error in deleting cart` })

    }
}
