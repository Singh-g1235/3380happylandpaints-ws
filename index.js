const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');

const url='mongodb://localhost:27017/paints';

const app = express();
const port = 8000
const mongoose=require('mongoose');

const corsOptions = {
    origin: '*'
}

//Add Cors to the express app
app.use(cors(corsOptions))

app.use(bodyParser.json());

 const loginRouter = require('./routes/loginRoute');
 const adminRouter = require('./routes/adminRoute');

 app.use('/login',loginRouter)
 app.use('/admin',adminRouter)
 const signupRouter = require('./routes/signupRoute');

 app.use('/login',loginRouter)
 app.use('/signup',signupRouter)



app.listen(port, () => {
    console.log(` Web Service  on port ${port}`)
    console.log(`Connecting to Database: ${url}`)
    try{
    mongoose.connect(url,
         { useNewUrlParser: true, 
            useUnifiedTopology: true,
            useFindAndModify: false }
            )   
        }
        catch(ex)
            {
                console.error(`something is wrong ${ex}`)
            }
          
        

})