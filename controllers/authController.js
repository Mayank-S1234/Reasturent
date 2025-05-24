const userModel = require("../models/userData");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken"); // यदि आप generateToken के लिए JWT का उपयोग कर रहे हैं
const { generateToken } = require("../middleware/jsonwebtoken"); // आपकी token generation utility
const { sendVerificationCode } = require("../middleware/EmailMiddleware/Email");

const authController = async (req, res) => {
  try {
    const VerificationCode = Math.floor(
      1000000 + Math.random() * 900000
    ).toString();

    const { userName, email, password } = req.body;

    // Validation
    if (!userName || !email || !password) {
      return res.status(400).send({
        // 400 Bad Request
        success: false,
        message: "Please provide all fields",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      if (existingUser.isVarified) {
        return res.status(409).send({
          // 409 Conflict
          success: false,
          message: "Email is already registered and verified. Please log in.",
        });
      } else {
        existingUser.userName = userName;
        existingUser.password = await bcrypt.hash(
          password,
          bcrypt.genSaltSync(10)
        );
        existingUser.verificationCode = VerificationCode;
        existingUser.verificationCodeExpires = new Date(
          Date.now() + 15 * 60 * 1000
        ); // 15 minutes to expire
        await existingUser.save();
        //Do not send JWT
        await sendVerificationCode(email, VerificationCode);
        return res.status(200).json({
          // 200 OK
          success: true,
          message:
            "Account already exists but not verified. New verification code sent to your email.",
          user: { userName: existingUser.userName },
        });
      }
    }

    // Hashing Password
    const salt = bcrypt.genSaltSync(10);
    const hassPassword = await bcrypt.hash(password, salt);

    // Create New User - isVerified - false Because user is not verified
    const user = await userModel.create({
      userName,
      email,
      password: hassPassword,
      verificationCode: VerificationCode,
      isVerified: false, 
      verificationCodeExpires: new Date(Date.now() + 5 * 60 * 1000), // Expire in 15 min
    });

    // OTP send
    await sendVerificationCode(email, VerificationCode);

    res.status(201).json({
      // 201 Created
      success: true,
      message:
        "Account created successfully. Verification code sent to your Email.",
      user: { userName: user.userName },
    });
  } catch (err) {
    console.log("Error in Register API:", err);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error: err.message, 
    });
  }
};

// otp Controller------------------------------------------------

const verifyOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide email and OTP." });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // OTP Expire Check
    if (
      user.verificationCodeExpires &&
      user.verificationCodeExpires < new Date()
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message: "OTP has expired. Please request a new one.",
        });
    }

    if (user.verificationCode !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP." });
    }

    // When Otp is Correct 
    user.isVarified = true;
    user.verificationCode = undefined; // Remove Otp
    user.verificationCodeExpires = undefined; // Remove Otp Expired
    await user.save();

    // Generate Token
    const payload = {
      id: user._id,
      userName: user.userName,
    };
    const token = generateToken(payload); // Token Generate Function
    console.log("The Token is: ", token);
    // // Send Token to the Client
    // res.cookie("jwt", token, {
    //   // HTTP-Only  for Cookies
    //   httpOnly: true, 
    //   secure: process.env.NODE_ENV === "production",
    //   maxAge: 24 * 60 * 60 * 1000,
    //   sameSite: "strict",
    // });

    res.status(200).json({
      success: true,
      message: "Email verified successfully! You are now logged in.",
      user: { userName: user.userName },
      token: token, // Seve token into localStorage
    });
  } catch (error) {
    console.error("Error during OTP verification:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Internal Server Error during OTP verification.",
      });
  }
};

//LOGIN-------------------------------------------------------------------LOGIN 
const loginController = async (req, res) => {
  try {
    const VerificationCode = Math.floor(
      1000000 + Math.random() * 900000
    ).toString();

    const { email, password } = req.body;

    //validfatuion
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide Email or Password",
      });
    }

    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found please Register",
      });
    }

    //Check USer Password | Compare Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Password is Incorrect",
      });
    }

    //Update User------------------------
    await userModel.updateOne({
      verificationCode: VerificationCode,
      verificationCodeExpires: new Date(Date.now() + 5*60*1000), //send otp time
    });
    await sendVerificationCode(email, VerificationCode);

    res.status(200).send({
      success: true,
      message: "Message send  at Email for Login",
    });
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).send({
      success: false,
      message: "Error in login API",
      err,
    });
  }
};

const logOutController = async (req, res) => {
  try {
    const userId = req.user._id; 
    if (!userId) {
      return res
        .status(401)
        .json({ message: "User ID not found in token. Cannot log out." });
    }

    // to do false otp verification in database
    const users = await userModel.findByIdAndUpdate(
      userId,
      { isVarified: false, otp: null, otpExpires: null }, 
      { new: true } // to recived updated document
    );

    if (!users) {
      return res.status(404).json({ message: "User not found." });
    }
      //Remove Token from client side
    res
      .status(200)
      .json({
        message: "Logged out successfully. OTP verification status reset.",
      });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error during logout." });
  }
};

module.exports = {
  authController, //Use for create an Account
  loginController,  //Use for Login 
  verifyOtpController,//Verifyie Otps
  logOutController,  //LogOut Honey ke liye
};
