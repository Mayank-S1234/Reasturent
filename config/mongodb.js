const mongoose =require("mongoose");

//define url for mongoDb
//const mongoUrl = process.env.LOCAL_URL;
const mongoUrl = process.env.DB_URL;

//setup mongoDb conection
mongoose.connect(mongoUrl);

//Get the Default connection
const db = mongoose.connection;

//Event listener for connetion mongoDb
db.on('connected',()=>{
    console.log("Database is successfully connected");
});

db.on('error',(err)=>{
    console.log("Your dataBase have Some Error: ",err);
});

db.on('disconnected', ()=>{
    console.log("Database is disConnected");
});

//Export dataBase
module.exports = db;