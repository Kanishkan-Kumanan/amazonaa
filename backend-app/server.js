const express = require('express');
const data = require("./data.js");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const seedRouter = require('./routes/seedRoutes.js');
const productRouter = require('./routes/productRoutes.js');
const userRouter = require('./routes/userRoutes.js');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/seed",seedRouter);
app.use("/api/products",productRouter);
app.use("/api/users",userRouter);


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

