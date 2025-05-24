const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require('fs');
require('dotenv').config();

const app = express();




//---------------------------------------------------------------
//connect with mongoDb
const db= require("../config/mongodb");


//----------------------------------------------------------------
//Middlewares
app.use(express.json());  //it is used to extrect data from incomming http request
app.use(express.urlencoded({extended:false}));//Take input from web
app.use(express.static("Public"));

//-----------------------------------------------------------------
//route
app.use("/api/v1/auth/",require("../Routers/login(signup)"));
app.use("/api/v1/become/", require("../Routers/becomeFranchise"));

const PORT = process.env.PORT;
//Port where project is run
app.listen(PORT ,( )=>{
    console.log("port is running ")
});

