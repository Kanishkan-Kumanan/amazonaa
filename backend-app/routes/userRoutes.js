const express = require("express");
const User = require("../models/usermodel");
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const generateToken = require("../utils.js");

const userRouter = express.Router();

userRouter.post("/signin",expressAsyncHandler(async (req,res) => {
  const {email,password} = req.body; 
  console.log(email,password);  
  const user = await User.findOne({email:email});
  if(user){
    if(bcrypt.compareSync(password,user.password)){
        console.log(user.name);
        res.send({
            _id : user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin,
            token : generateToken(user),
        });
        return;
    }
  }
  res.status(401).send({message: "Invalid Email or Password"});
}));

userRouter.post("/signup",expressAsyncHandler(async (req,res)=>{
  const newUser = new User({
    name : req.body.name,
    email : req.body.email,
    password : bcrypt.hashSync(req.body.password,10)
  })
  const user = await newUser.save();
  res.send({
    _id : user._id,
    name : user.name,
    email : user.email,
    isAdmin : user.isAdmin,
    token : generateToken(user),
});
}))

module.exports = userRouter;