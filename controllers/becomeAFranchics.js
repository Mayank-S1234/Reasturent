const becomeFranchics = require("../models/BecomeFranchise");
const { sendVerificationCode } = require("../middleware/EmailMiddleware/Email");

//Register
const franchicesController = async (req, res) => {
  try {
    const { name, email, phone, city, investment, reason } = req.body;
    //validation
    if (!name || !email || !phone || !city || !investment || !reason) {
      return res.status(400).send({
        success: false,
        message: "Please provide All fields",
      });
    }

    //Check Franchics
    const exisiting = await becomeFranchics.findOne({ email });
    if (exisiting) {
      return res.status(500).send({
        success: false,
        message: "Email Already Register",
      });
    }
    //Create an Otp Message
    const VerificationCode = Math.floor(
      1000000 + Math.random() * 900000
    ).toString();

    // Send verification code
    sendVerificationCode(email, VerificationCode);

    res.status(200).json({
      success: true,
      message: "Verification Code send Successfully at your gmail",
    });
    // Create New User - isVerified - false Because user is not verified
    const user = await becomeFranchics.create({
      name,
      email,
      phone,
      city,
      investment,
      reason,
      verificationCode: VerificationCode,
      isVerified: false,
      verificationCodeExpires: new Date(Date.now() + 5 * 60 * 1000), // Expire in 5 min
    });
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      err,
    });
  }
};

// otp Controller------------------------------------------------

const verifyfranchiseController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide email and OTP." });
    }

    const user = await becomeFranchics.findOne({ email });

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
      return res.status(400).json({
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
    /*
    // Generate Token
    const payload = {
      id: user._id,
      userName: user.userName,
    };
    const token = generateToken(payload); // Token Generate Function
    console.log("The Token is: ", token);
    // Send Token to the Client
    res.cookie("authToken", token, {
      // HTTP-Only  for Cookies
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });
*/
    res.status(200).json({
      success: true,
      message: "Email verified successfully! we will contact with you later.",
      // user: { userName: user.userName },
      // token: token, // Seve token into localStorage
    });
  } catch (error) {
    console.error("Error during OTP verification:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error during OTP verification.",
    });
  }
};
module.exports = { franchicesController, verifyfranchiseController };
