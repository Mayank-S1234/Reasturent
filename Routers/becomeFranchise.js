const express = require("express");
const { jwtauthMiddleware } = require("../middleware/jsonwebtoken");
const { franchicesController, verifyfranchiseController } = require("../controllers/becomeAFranchics");


//router object
const router = express.Router();

//routes Get | Post | Update | Put

//POST
router.post("/create", franchicesController);
router.post("/verify", verifyfranchiseController);


module.exports = router;