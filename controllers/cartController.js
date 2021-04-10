const Cart = require("../models/cart");
const Product = require("../models/product");
const Orders = require("../models/order");
const nodemailer = require('nodemailer')
const user = require("./loginController");

const { v4: uuidv4 } = require("uuid");
// adding products to cart
exports.addToCart = async (req, res) => {
  try {
    var cartItem = await Cart.findOne({ ProductId: req.body.ProductId }).exec();
    var productItem = await Product.findOne({
      ProductId: req.body.ProductId,
    }).exec();
    // console.log("Line 11 - > " + cartItem)
    if (!cartItem) {
      //console.log("In null")
      var product = {
        ProductId: req.body.ProductId,
        ProductName: req.body.ProductName,
        ProductQuantity: 1,
        ProductAmount: req.body.ProductAmount,
      };
      var newInventoryItem = {
        ...productItem,
        ProductQuantity: productItem.ProductQuantity--,
      };

      var newCartItem = new Cart(product);
      await newCartItem.save();
      res.status(200);
    } else {
      var updatedItem = {
        ProductId: req.body.ProductId,
        ProductName: req.body.ProductName,
        ProductQuantity: ++cartItem.ProductQuantity,
        ProductAmount: cartItem.ProductAmount + req.body.ProductAmount,
      };
      let options = { upsert: true, new: true, setDefaultsOnInsert: true };
      updatedItemResult = await Cart.findOneAndUpdate(
        { ProductId: req.body.ProductId },
        updatedItem,
        options
      );
    }
    var productItem = await Product.findOne({
      ProductId: req.body.ProductId,
    }).exec();
    let options = { upsert: true, new: true, setDefaultsOnInsert: true };
    var newInventoryItem = {
      ...productItem,
      ProductQuantity: productItem.ProductQuantity--,
    };
    newUpdatedInventoryItem = await Product.findOneAndUpdate(
      { ProductId: req.body.ProductId },
      newInventoryItem,
      options
    );
  } catch {
    res.status(500);
    res.send({
      message: `Error in Adding Product with product id ${req.body.ProductId} to the cart`,
    });
  }
};

//deleting products from cart
exports.deleteProduct = async (req, res) => {
  try {
    deletedProductResult = await Cart.deleteOne({
      ProductId: req.body.ProductId,
    });
    if (!deletedProductResult) {
      res.status(404);
      res.header("Content-Type", "application/json");
      res.send({ message: `Product Not Found ${req.body.ProductId}` });
    } else {
      res.status(200);
      res.send(deletedProductResult);
    }
    console.log("in the delete");
  } catch {
    res.status(500);
    res.send({
      message: `Error in Deleting Product with product id ${req.body.ProductId}`,
    });
  }
};

//getting the products which user added  in the cart
exports.getLoadedCart = async (req, res) => {
  try {
    var cartList = await Cart.find();
    if (!cartList) {
      res.status(404);
      res.header("Content-Type", "application/json");
      res.send({ message: `Could not find cart` });
      res.send(cartList);
    } else {
      res.status(200);
      res.header("Content-Type", "application/json");
      res.send(cartList);
    }
  } catch {
    res.status(500);
    res.send({ error: "Cart is empty" });
  }
};

//getting the products by id

exports.getProduct = async (req, res) => {
  try {
    var product = await Product.findOne({
      ProductId: req.body.productId,
    }).exec();

    if (!product) {
      res.status(404);
      res.header("Content-Type", "application/json");
      res.send({ message: `Could not find ${req.body.productId}` });

      res.send(product);
    } else {
      res.status(200);
      res.header("Content-Type", "application/json");

      res.send(product);
    }
  } catch (err) {
    res.status(500);
    res.header("Content-Type", "application/json");
    res.send({
      message: `Error in finding : ${req.body.productId} . ${err.stack}`,
    });
  }
};

//updating database by deleting the products from cart
exports.updateProduct = async (req, res) => {
  try {
    let options = { upsert: true, new: true, setDefaultsOnInsert: true };
    var product = await Product.findOne({
      ProductId: req.body.productId,
    }).exec();
    product.ProductQuantity--;

    updatedProductResult = await Product.findOneAndUpdate(
      { ProductId: req.body.ProductId },
      product,
      options
    );
    res.status(200);
    res.header("Content-Type", "application/json");
    res.send(updatedProductResult);
  } catch {
    res.status(500);
    res.send({
      message: `Error in Updating Product with product id ${req.body.ProductId}`,
    });
  }
};

//fetching all the products at the homepage
exports.getProducts = async (req, res) => {
  try {
    var productList = await Product.find();

    if (!productList) {
      res.status(404);
      res.header("Content-Type", "application/json");
      res.send({ message: `Could not find products` });
      res.send(productList);
    } else {
      res.status(200);
      res.header("Content-Type", "application/json");
      res.send(productList);
    }
  } catch {
    res.status(500);
    res.send({ error: "The Vendor did not supply products..." });
  }
};

//deleting the product from cart
exports.deleteCart = async (req, res) => {
  try {
    console.log("in the delete")
    deleteCart = await Cart.deleteMany({});
    if (!deleteCart) {
      res.status(404);
      res.header("Content-Type", "application/json");
      res.send({ message: `Cart not cleared` });
    } else {
      res.status(200);
      res.send(deleteCart);
    }
    // console.log("in the delete")
  } catch {
    res.status(500);
    res.send({ message: `Error in deleting cart` });
  }
};

//clearing the cart and adding data to orders table to the database
exports.addToOrders = async (req, res) => {
  try {
    console.log("hi");
    console.log(req.body.cart);
    var status = "Pending";

    var total = req.body.cart.cart
      .map((ele) => ele.ProductAmount)
      .reduce((total, price) => total + price, 2);

    console.log("total " + total);

    orderCreate = await Orders.insertMany({
      ProductId: req.body.cart.cart[0].ProductId,
      ProductName: req.body.cart.cart[0].ProductName,
      ProductQuantity: req.body.cart.cart[0].ProductQuantity,
      ProductAmount: req.body.cart.cart[0].ProductAmount,
      OrderStatus: status,
      UserId: req.body.cart.UserId,
      OrderId: uuidv4(),
      OrderAmount: total,
    });

    if (!orderCreate) {
      res.status(404);
      res.header("Content-Type", "application/json");
      res.send({ message: `Orders not cleared` });
    } else {
      res.status(200);
      res.send(orderCreate);
    }
    // console.log("in the Orders");
  } catch {
    res.status(500);
    res.send({ message: `Error in updating cart` });
  }
};

exports.sendEmail = async (req, res) => {

  var total = req.body.cart.cart
    .map((ele) => ele.ProductAmount)
    .reduce((total, price) => total + price, 2);

 // data to be sent via email
  let ProductName = req.body.cart.cart[0].ProductName;
  let ProductAmount= req.body.cart.cart[0].ProductAmount;
  let UserId = req.body.cart.UserId;
  let OrderId = uuidv4();
;


  //let data=total;
 //console.log("haa va data" + data)
  let smtp = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    auth: {
      user: 'moosewalas901@gmail.com',
      pass: 'Ajax3380'
    }
  });

  let mailOptions = {
    from: 'moosewalas901@gmail.com',
    to: UserId,
    subject: 'Here is your cart summary',
    text: `Dear customer, ${UserId},\n \nYour order of ${ProductName} has been placed with HappyLandPaints.\nYour order will be shipped to your address in couple of days.\nYour Order total is $${ProductAmount}.\nIf you want to check the status of your order, kindly use this ${OrderId} to review it.
    `
  };

  smtp.sendMail(mailOptions, function (error, data) {
    if (error) {

      console.log("Error" + error)
    }
    else {
      console.log('Success')
    }
  })
  smtp.close();
  res.send(UserId)
}
