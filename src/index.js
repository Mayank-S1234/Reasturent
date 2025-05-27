const express = require("express");
const bodyParser = require("body-parser");
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
app.use("/api/v1/contact/", require("../Routers/contactRoutes"));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
