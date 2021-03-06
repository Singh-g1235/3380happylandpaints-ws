const Product = require("../models/product")  
const Order = require("../models/order") 
const SignUp = require("../models/signup") 
const Login = require('../models/login')  

var bcrypt = require("bcryptjs");

//controller methods for products begin
exports.getProducts = async (req, res) => {
  
    try {  res.header("Content-Type", "application/json");
        var productList = await Product.find();
        if (!productList) {
            res.status(404);
           
            res.send({ message: `Could not find products` })
            res.send(productList)

        } else {
            res.status(200);
           
            res.send(productList)
        }
    } catch {
        res.status(500);
        res.send({ error: "The Vendor did not supply products..." })
    }
}

exports.getProduct = async (req, res) => {
   
    try {  res.header("Content-Type", "application/json");
       
        var product = await Product.findOne({ ProductId: req.params.productId }).exec();
        
        if (!product) {
            res.status(404);
           
            res.send({ message: `Could not find ${req.params.productId}` })
            
            res.send(product)

        } else {
            res.status(200);
           
           
            res.send(product)
        }
    } catch (err) {
        res.status(500);
       
        res.send({ message: `Error in finding : ${req.params.productId} . ${err.stack}` })

    }
}

exports.addProduct = async (req, res) => {

    try {  res.header("Content-Type", "application/json");
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
        
        res.send(productData);
        

    } catch {
        res.status(500)
        res.send({ message: `Error in Adding Product with product id ${req.body.ProductId}` })

    }
   

    
    
}

exports.updateProduct = async (req, res) => {
    
  
    try {  res.header("Content-Type", "application/json"); 
        let options = { upsert: true, new: true, setDefaultsOnInsert: true };
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
       
        updatedProductResult = await Product.findOneAndUpdate({ProductId:req.body.ProductId},product,options);
        res.status(200)
        
        res.send(updatedProductResult);
        

    }catch {
        res.status(500)
        res.send({ message: `Error in Updating Product with product id ${req.body.ProductId}` })

    }
}

exports.deleteProduct = async (req, res) => {
   

    try {  res.header("Content-Type", "application/json");
        deletedProductResult = await Product.findOneAndDelete({ ProductId: req.body.ProductId })
        if(!deletedProductResult){
            res.status(404);
           
            res.send({ message: `Product Not Found ${req.body.ProductId}` })
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

//controller methods for order begin
exports.getOrders = async (req, res) => {
    
    try {  res.header("Content-Type", "application/json");
        var orderList = await Order.find();
        if (!orderList) {
            res.status(404);
           
            res.send({ message: `Could not find orders` })
          

        } else {
            res.status(200);
           
            res.send(orderList)
        }
    } catch {
        res.status(500);
        res.send({ error: "The customers did not order..." })
    }
}
exports.getOrder = async (req, res) => {
    try {  res.header("Content-Type", "application/json");
        var order = await Order.findOne({ OrderId: req.params.orderId }).exec();
        
        if (!order) {
            res.status(404);
           
            res.send({ message: `Could not find ${req.params.orderId}` })
        

        } else {
            res.status(200);
           
           
            res.send(order)
        }
    } catch (err) {
        res.status(500);
       
        res.send({ message: `Error in finding : ${req.params.orderId} . ${err.stack}` })

    }
}
exports.shipOrder = async (req, res) => {
   
    try {  res.header("Content-Type", "application/json");
        let update = {"OrderStatus" : "Completed"}
        updatedOrderResult = await Order.findOneAndUpdate({OrderId:req.body.OrderId},update,{new:true});
        res.status(200)
        
        
        res.send(updatedOrderResult);
        

    }catch {
        res.status(500)
        res.send({ message: `Error in Updating Order with Order id ${req.body.OrderId}` })

    }
}
//controller methods for order end

//controller methods for user begin
exports.getUsers = async (req, res) => {
    try {  res.header("Content-Type", "application/json");
        var userList = await SignUp.find();
        if (!userList) {
            res.status(404);
           
            res.send({ message: `Could not find user` })
        

        } else {
            res.status(200);
           
            res.send(userList)
        }
    } catch {
        res.status(500);
        res.send({ error: "The user did not return" })
    }
}
exports.getUser = async (req, res) => {
    try {  res.header("Content-Type", "application/json");
        var user = await SignUp.findOne({ UserId: req.params.userId }).exec();
        
        if (!user) {
            res.status(404);
           
            res.send({ message: `Could not find ${req.params.userId}` })
        

        } else {
            res.status(200);
           
           
            res.send(user)
        }
    } catch (err) {
        res.status(500);
       
        res.send({ message: `Error in finding : ${req.params.userId} . ${err.stack}` })

    }
}
exports.addUser = async (req, res) => {
   
  try {  res.header("Content-Type", "application/json");
  var hashedPassword = bcrypt.hashSync(req.body.Password, 8);
    var user = {
      "UserId": req.body.UserId,
      "Password": hashedPassword,
      "FirstName": req.body.FirstName,
      "LastName": req.body.LastName,
      "City": req.body.City,
      "Province": req.body.Province,
      "Zip": req.body.Zip,
      "Unit": req.body.Unit
    }
    var login = {
        "UserId": req.body.UserId,
        "Password": hashedPassword,
        "Role": "customer"
    }
    var userData = new SignUp(user);
    var loginData = new Login(login);
    await userData.save();
    await loginData.save();
    res.status(200)
    
    res.send(userData);
   
  } catch {
    res.status(500);
    
    res.send({ error: "The user is not authorized" });
  }
}
exports.updateUser = async (req, res) => {
    try {  res.header("Content-Type", "application/json");
        let options = { upsert: true, new: true, setDefaultsOnInsert: true };
        var user = {
            "UserId": req.body.UserId,
            "Password": req.body.Password,
            "FirstName": req.body.FirstName,
            "LastName": req.body.LastName,
            "City": req.body.City,
            "Province": req.body.Province,
            "Zip": req.body.Zip,
            "Unit": req.body.Unit,
          }
        var login = {
            "UserId": req.body.UserId,
            "Password": req.body.Password,
            "Role": "customer"
        }
        updatedUserResult = await SignUp.findOneAndUpdate({UserId:req.body.UserId},user,options);
        updatedLoginResult = await Login.findOneAndUpdate({UserId:req.body.UserId},login,options);
        res.status(200)
        
        res.send(updatedUserResult);
        

    }catch {
        res.status(500)
        
        res.send({ message: `Error in Updating User with user id ${req.body.UserId}` })

    }
}
exports.deleteUser = async (req, res) => {
    try {  res.header("Content-Type", "application/json");
        deletedUserResult = await SignUp.findOneAndDelete({ UserId: req.body.UserId })
        deletedLoginResult = await Login.findOneAndDelete({ UserId: req.body.UserId })
        if(!deletedUserResult || !deletedLoginResult){
            res.status(404);
           
            res.send({ message: `User not found ${req.body.UserId}` })
        } else{
            res.status(200)
            res.send(deletedProductResult);
        }


    } catch {
        res.status(500)
        res.send({ message: `Error in Deleting User with user id ${req.body.UserId}` })

    }
}
//controller methods for user end

//controller method for approveSupply begin
exports.approveSupply = async (req, res) => {
   
  
    try {  res.header("Content-Type", "application/json");
        var fetchProduct = await Product.findOne({ ProductId: req.body.ProductId }).exec();
       
        if (!fetchProduct) {
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
            
            res.send(productData);

        } else {
        
            let options = { upsert: true, new: true, setDefaultsOnInsert: true };
            var update = 
            { $inc: 
                {"ProductQuantity": req.body.ProductQuantity}   
            }
           
            updatedProductResult = await Product.findOneAndUpdate({ProductId:req.body.ProductId},update,options);
            res.status(200)
            
            res.send(updatedProductResult);
        }

        

    }catch {
        res.status(500)
        
        res.send({ message: `Error in Updating Product with product id ${req.body.ProductId}` })

    }
}
//controller method for approveSupply end
