const mongoose = require("mongoose");

const userScheema = new mongoose.Schema
({
  userName:{
    type:String,
    required:[true, 'User name is required']
  },
  email:{
    type:String,
    required:[true, 'email is require'],
    unique:true
  },
  password:{
    type:String,
    required:[true,'Password is require']
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

//Create Person Model where we insert data
const user = mongoose.model('user',userScheema);

//Export model
module.exports = user;