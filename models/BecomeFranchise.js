const mongoose = require("mongoose");

//create a scheema
const becomeFranchise = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
    },
    email: {
      type: String,
      required: [true, "email is require"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    investment: {
      type: String,
      required: [true, "investment is required"],
    },
    reason: {
      type: String,
      default: true,
    },
    isVarified: {
      type: Boolean,
      default: false,
    },
    verificationCode: {
      type: String,
    },
    verificationCodeExpires: {
      type: Date,
    },
  },
  { timestamp: true }
);

//Create Person Model where we insert data
const BecomeFranchise = mongoose.model("becomeFranchise", becomeFranchise);

//Export model
module.exports = BecomeFranchise;
