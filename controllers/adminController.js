const Product = require("../models/product")  
const Order = require("../models/order") 
const User = require("../models/user")   


//controller methods for products begin
exports.getProducts = async (req, res) => {
  
    try {
        var productList = await Product.find();
        if (productList.count === 0) {
            res.status(404);
            res.header("Content-Type", "application/json");
            res.send({ message: `Could not find ${req.params.productId}` })
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

exports.getProduct = async (req, res) => {
   
    try {
        var product = await Product.findOne({ ProductId: req.params.productId }).exec();
        
        if (product.count === 0) {
            res.status(404);
            res.header("Content-Type", "application/json");
            res.send({ message: `Could not find ${req.params.productId}` })
            
            res.send(product)

        } else {
            res.status(200);
            res.header("Content-Type", "application/json");
           
            res.send(product)
        }
    } catch (err) {
        res.status(500);
        res.header("Content-Type", "application/json");
        res.send({ message: `Error in finding : ${req.params.productId} . ${err.stack}` })

    }
}

exports.addProduct = async (req, res) => {

    try {
        var product = 
        {
            "ProductId": req.body.ProductId, "ProductName": req.body.ProductName,
            "ProductDescription": 
            {
            "availableColours": req.body.availableColours,
            "sheen": req.body.sheen, "cleanup": req.body.cleanup,
            "resinType": req.body.resinType, "recommendedUse": req.body.recommendedUse,
            "mpiRating": req.body.mpiRating, "vocLevel": req.body.vocLevel
            },
            "ProductQuantity": req.body.ProductQuantity,"ProductImage": "","ProductType": req.body.ProductType,
            "ProductAmount": req.body.ProductAmount
        }
    
        var productData = new Product(product);
        await productData.save();
        res.status(200)
        res.header("Content-Type", "application/json")
        res.send(product);

    } catch {
        res.status(500)
        res.send({ message: `Error in Adding Product with product id ${req.body.ProductId}` })

    }
   

    
    
}

exports.updateProduct = async (req, res) => {
    
    try{
        await Product.findOneAndUpdate
        var product = 
        {
        "ProductId": req.body.ProductId, "ProductName": req.body.ProductName,
        "ProductDescription": 
        {
        "availableColours": req.body.availableColours,
        "sheen": req.body.sheen, "cleanup": req.body.cleanup,
        "resinType": req.body.resinType, "recommendedUse": req.body.recommendedUse,
        "mpiRating": req.body.mpiRating, "vocLevel": req.body.vocLevel
        },
        "ProductQuantity": req.body.ProductQuantity,"ProductImage": "","ProductType": req.body.ProductType,
        "ProductAmount": req.body.ProductAmount
        }
        updatedProductResult = await Product.findOneAndUpdate({ProductId:req.body.ProductId},product,{new:true});
        res.status(200)
        res.header("Content-Type", "application/json")
        res.send(updatedProductResult);
        

    }catch {
        res.status(500)
        res.send({ message: `Error in Updating Product with product id ${req.body.ProductId}` })

    }
}

exports.deleteProduct = async (req, res) => {
   

    try {
        deletedProductResult = await Product.findOneAndDelete({ ProductId: req.body.ProductId })
        if(deletedProductResult.count === 0){
            res.status(404);
            res.header("Content-Type", "application/json");
            res.send({ message: `The librarian could not find ${req.body.ProductId}` })
        } else{
            res.status(200)
            res.send(deletedProductResult);
        }


    } catch {
        res.status(500)
        res.send({ message: `Error in Deleting Product with product id ${req.body.ProductId}` })

    }
}
//controller methods for products end

//controller methods for user begin
exports.getOrders = async (req, res) => {}
exports.getOrder = async (req, res) => {}
exports.shipOrder = async (req, res) => {}
//controller methods for user end

//controller methods for order begin
exports.getUsers = async (req, res) => {}
exports.getUser = async (req, res) => {}
exports.addUser = async (req, res) => {}
exports.updateUser = async (req, res) => {}
exports.deleteUser = async (req, res) => {}
//controller methods for order end














