const deleteOrders = require("../models/deleteOrders");

//get all the orders for a particular user.
exports.getUserOrders=async(req,res)=>
{
    try {
        var ordersList = await deleteOrders.find({UserId: req.params.UserId});
        if (!ordersList) {
            res.status(404);
            res.header("Content-Type", "application/json");
            res.send({ message: `You have not shoped with HappyLand Paints yet! ` })
            res.send(ordersList)

        } else {
            res.status(200);
            res.header("Content-Type", "application/json");
            res.send(ordersList)
        }
    } catch {
        res.status(500);
        res.send({ error: "There is something wrong! Sorry we will fix it soon!" })
    }

};


exports.deleteOrder = async (req, res) => {
   
    try {
        result = await deleteOrders.findOneAndDelete({ UserId: req.body.UserId, OrderId:req.body.OrderId })
        if(!result){
            res.status(404);
            res.header("Content-Type", "application/json");
            res.send({ message: `Order Not Found ${req.body.OrderId}` })
        } else{
            res.status(200)
            res.send(result);
        }


    } catch {
        res.status(500)
        res.send({ message: `Error in Deleting the order with order id ${req.body.OrderId}` })

    }
}