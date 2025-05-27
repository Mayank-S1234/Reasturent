const express = require("express");
const {
  authController,
  loginController,
  verifyOtpController,
  logOutController,
} = require("../controllers/authController");
const {  changePassword ,deleteUserController, forgetpassword } = require("../controllers/userController");
const { jwtauthMiddleware } = require("../middleware/jsonwebtoken");

const router = express.Router();
//routes

//Register || 
router.post("/register", authController);

//LOGIN
router.post("/login", loginController);

//Verify OTP------------------------
router.post("/verifyOtp", verifyOtpController);

//FORGET PASSWORD--------------------
router.post("/forget-password", forgetpassword)
router.post("/change-password", changePassword )

//LOGOUT----------------------------
router.post("/logout", jwtauthMiddleware , logOutController);

//Delete Account---------------------
router.delete("/deleteAccount",jwtauthMiddleware, deleteUserController);

module.exports = router;
