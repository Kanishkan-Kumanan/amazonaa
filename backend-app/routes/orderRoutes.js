const express = require("express");
const Order = require("../models/ordermodel");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../utils.js");

const orderRouter = express.Router();


module.exports = orderRouter;