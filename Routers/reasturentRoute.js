const express = require("express");
const { jwtauthMiddleware } = require("../middleware/jsonwebtoken");
const { createReasturentController, getAllReasturentControll } = require("../controllers/restaurentController");



//router object
const router = express.Router();

//routes Get | Post | Update | Put

//Create Reasturent || POST
router.post("/create",jwtauthMiddleware, createReasturentController);

// GET ALL REASTURENT || GET
router.get("/getAll", getAllReasturentControll);
//export
module.exports = router;