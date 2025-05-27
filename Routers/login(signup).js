const express = require("express");
const {
  authController,
  loginController,
  verifyOtpController,
  logOutController,
} = require("../controllers/authController");
const franchicesController = require("../controllers/becomeAFranchics");
const showcontroller = require("../controllers/showcontroller");
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


//Become a Franchise
//router.post("/becomeFranchics", franchicesController);

//router.get("/userName", jwtauthMiddleware, showcontroller);
module.exports = router;
