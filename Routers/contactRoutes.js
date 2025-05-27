const express = require('express');
const { SendMessageCOntroller, verifyController } = require('../controllers/sendMessageController');
const route = express.Router();


//ROUTES
route.post("/send", SendMessageCOntroller);
route.post("/verify",verifyController)

module.exports = route;
