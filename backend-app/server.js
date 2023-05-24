const express = require('express');
const data = require("./data.js");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const seedRouter = require('./routes/seedRoutes.js');
const productRouter = require('./routes/productRoutes.js');
const userRouter = require('./routes/userRoutes.js');
const orderRouter = require('./routes/orderRoutes.js');
const path = require("path");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/api/keys/paypal",(req,res) => {
    res.send(process.env.PAYPAL_CLIENT || 'sb');
});

app.use("/api/seed",seedRouter);
app.use("/api/products",productRouter);
app.use("/api/users",userRouter);
app.use("/api/orders",orderRouter);

var __dirname = path.resolve();

app.use(express.static(path.join(__dirname,'/frontend-app/build')));

app.get('*',(req,res) =>
res.sendFile(path.join(__dirname,'/frontend-app/build/index.html')));

app.use((err,req,res,next) =>{
    res.status(500).send({message:err.message});
})

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL).then(() =>{
    console.log("Connected to Mongodb")
}).catch(err =>{
    console.log(err.message);
})



app.listen(port,()=>{
    console.log("Server is running");
})

