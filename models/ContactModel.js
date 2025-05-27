const mongoose = require("mongoose");

//create a scheema for Reasturent
const sendMessage = new mongoose.Schema
({
   Name:{
    type:String,
   },
   Email:{
    type:String,
   },
   Message:{
      type:String,
   },
  isVarified:{
    type:Boolean,
    default:false,
  },
  verificationCode:{
    type:String,
  },
  verificationCodeExpires: {
        type: Date,
    }
},{timestamp:true});


//Create reasturent Model where we insert data
const message = mongoose.model('Message',sendMessage);

//Export model
module.exports = message;