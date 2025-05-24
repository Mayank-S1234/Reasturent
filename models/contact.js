const mongoose = require("mongoose");

//create a scheema 
const userContact = new mongoose.Schema
({
  name:{
    type:String,
    required:[true, 'User name is required']
  },
  email:{
    type:String,
    required:[true, 'email is require'],
    unique:true
  },
  phone:{
    type:String,
    required:[true,'phone number is required']
  },
  city:{
    type:String,
    required:[true, 'City is required']
  },
  investment:{
    type:String,
    required:[true,'investment is required']
  },
  reason:{
    type:String,
    default:[true, 'Me nhi Btaunga'],
  }, 
},{timestamp:true});

//Create Person Model where we insert data
const BecomeFranchise = mongoose.model('becomeFranchise',becomeFranchise);

//Export model
module.exports = BecomeFranchise;