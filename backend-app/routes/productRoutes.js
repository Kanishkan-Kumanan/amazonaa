const express = require("express");
const Product = require("../models/productmodel");

const productRouter = express.Router();

productRouter.get("/",async (req,res)=>{
  const products = await Product.find();
  res.send(products);
});


productRouter.get("/slug/:slug",async (req,res)=>{
    const product = await Product.findOne({slug : req.params.slug});;
    if(product){
        res.send(product);
    }else{
        res.status(404).send({message:"No such item found"});
    }
})

productRouter.get("/:id",async (req,res)=>{
    const product = await Product.findById(req.params.id);
    if(product){
        res.send(product);
    }else{
        res.status(404).send({message:"No such item found"});
    }
})

module.exports = productRouter;