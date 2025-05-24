const mongoose = require("mongoose");

//create a scheema for Reasturent
const reasturentScheema = new mongoose.Schema
({
   title:{
    type:String,
   },
   imageUrl:{
    type:String,
   },
   foods:{ type: Array },
   time:{
    type:String,
   },
   pickup:{
    type:Boolean,
    default:true,
   },
   delivery:{
    type:Boolean,
    default:true,
   },
   isOpen:{
    type:Boolean,
    default:true,
   },
   logoUrl:{
    type:String,
   },
   rating:{
    type:Number,
    dafault:1,
    min:1,
    max:5,
   },
   ratingCount:{
    type:String,
   },
   code:{
    type:String,
   },
   //Location
   coords:{
    id: { type : String },
    latitude: { type : Number },
    latitudeDelta: { type : Number },
    longitude: { type : Number },
    longitudeDelta: { type : Number },
    address: { type : String },
    title: { type : String },
   },

},{timestamp:true});


//Create reasturent Model where we insert data
const reasturent = mongoose.model('RestaurentG',reasturentScheema);

//Export model
module.exports = reasturent;