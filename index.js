const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');

//const url='mongodb+srv://happylandpaints:happy@happylandpaints.su0wq.mongodb.net/paints';
const url='mongodb://localhost:27017/paints';

const app = express();
const port = 8000
const mongoose=require('mongoose');

const corsOptions = {
	origin: "http://localhost:3000",
    credentials: true
}


//Add Cors to the express app
app.use(cors(corsOptions))

app.use(bodyParser.json());

 const loginRouter = require('./routes/loginRoute');
 const adminRouter = require('./routes/adminRoute');
 const signupRouter = require('./routes/signupRoute');
 const cartRouter = require('./routes/cartRoute');
 const deleteRouter = require('./routes/deleteOrdersRoute');

 app.use('/login',loginRouter)
 app.use('/admin',adminRouter)
 app.use('/deleteOrders',deleteRouter)
 app.use('/signup',signupRouter)
 app.use('/cart',cartRouter)



app.listen(port, () => {
    console.log(` Web Service  on port ${port}`)
    console.log(`Connecting to Database: ${url}`)
    try{
    mongoose.connect(url,
         {  useNewUrlParser: true, 
            useUnifiedTopology: true,
            useFindAndModify: false }
            )   
        }
        catch(ex)
            {
                console.error(`something is wrong ${ex}`)
            }
          
        

})
