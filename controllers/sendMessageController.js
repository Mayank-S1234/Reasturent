const contact = require("../models/ContactModel");
const { sendVerificationCode } = require("../middleware/EmailMiddleware/Email");
const SendMessageCOntroller = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const VerificationCode = Math.floor(
      1000000 + Math.random() * 900000
    ).toString();

    await sendVerificationCode(email, VerificationCode);
    // Create New User - isVerified - false Because user is not verified
    const user = await contact.create({
      Name: name,
      Email: email,
      Message: message,
      verificationCode: VerificationCode,
      isVarified: false,
      verificationCodeExpires: new Date(Date.now() + 5 * 60 * 1000), // Expire in 5 min
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Verification code sent and contact saved",
    });
  } catch (error) {
    console.log("Error in Register API:", error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error: error.message,
    });
  }
};

// otp Controller------------------------------------------------
const verifyController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Please provide email and OTP." });
    }

    const user = await contact.findOne({ Email: email }); // Correct casing here

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    if (user.verificationCodeExpires && user.verificationCodeExpires < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
      });
    }

    if (user.verificationCode !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP." });
    }

    user.isVarified = true;  // Fix typo here
    user.verificationCode = undefined;
    user.verificationCodeExpires = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully! Your message sent successfully.",
    });
  } catch (error) {
    console.error("Error during OTP verification:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error during OTP verification.",
    });
  }
};

module.exports = { SendMessageCOntroller, verifyController };
