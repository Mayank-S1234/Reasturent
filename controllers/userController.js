const { TokenExpiredError } = require("jsonwebtoken");
const user = require("../models/userData");
const bcrypt = require("bcryptjs");
const { sendVerificationCode } = require("../middleware/EmailMiddleware/Email");
//<<<<<<<<<---------------- Reset Password ----------------- >>>>>>>>>>>>>>//

const forgetpassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    //Taking Email From the Database
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(500).send({
        success: false,
        message: "User not Found or Invalid Answer",
      });
    }
    const VerificationCode = Math.floor(
      1000000 + Math.random() * 900000
    ).toString();

    existingUser.verificationCode = VerificationCode;
    existingUser.verificationCodeExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes to expire
    await existingUser.save();
    await sendVerificationCode(email, VerificationCode);
    res.status(200).json({
      // 200 OK
      success: true,
      message: "Send a messege on your email for create new password.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in Reset Password Api",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { email, password, otp } = req.body;

    if (!email || !password || !otp) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide email, new password and OTP.",
        });
    }

    const existingUser = await user.findOne({ email });

    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // OTP Expire Check
    if (
      existingUser.verificationCodeExpires &&
      existingUser.verificationCodeExpires < new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }

    if (existingUser.verificationCode !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP." });
    }

    //Hasing Password (Create a new Password)
    const salt = bcrypt.genSaltSync(10);
    const hassPassword = await bcrypt.hash(password, salt);

    // When Otp is Correct
    existingUser.verificationCode = undefined; // Remove Otp
    existingUser.verificationCodeExpires = undefined; // Remove Otp Expired
    existingUser.password = hassPassword; //Save newPssword into DataBase
    await existingUser.save();
    //Send Response to the Client
    res.status(201).send({
      success: true,
      message: "Password Change succefully",
    });
  } catch (error) {
    console.error("Error during OTP verification:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error during OTP verification.",
    });
  }
};

//<<<<<<<<<------------ DELETE USER (DELETE ACCOUNT) ----------->>>>>>>>>>>>>//
const deleteUserController = async (req, res) => {
  try {
    await user.findByIdAndDelete(req.user);
    console.log(req.user);
    if (!req.user) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized: User ID not found. Please log in.",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Your Account Completly Deleted",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Failed to delete account due to server error.",
    });
  }
};

module.exports = {
  forgetpassword,
  changePassword,
  deleteUserController,
};
