const Reasturent = require("../models/reasturentModel");

//------------>>>>>>>>>>  CREATE REASTURENT DATA <<<<<<<<<<<------------------//
const createReasturentController = async (req,res) =>{
  try{
   const {title,  
    imageUrl,
    foods,
    pickup,
    delivery,
    isOpen,
    logoUrl,
    rating,
    ratingCount,
    code,
    coords,
   } = req.body;

//Validation
if(!title || !coords){
    return res.status(500).send({
        success:false,
        message:"title and Address Must Required"
    });
}

    const newReasturent = new Reasturent({
    title,  
    imageUrl,
    foods,
    pickup,
    delivery,
    isOpen,
    logoUrl,
    rating,
    ratingCount,
    code,
    coords,
    });
    await newReasturent.save();
    res.status(201).send({
        success:true,
        message:"Data Created successfully",
    });

  }catch(err){
    console.log(err);
    res.status(500).send({
    success:false,
    message: "Error in Create Reasturent Api" 
  });
 }
}

//<<<<<<<<<<<<------------ GET ALL REASTURENT | GET METHOD ------------>>>>>>>>

const getAllReasturentControll = async (req, res)=>{

    try{

    }catch(err){
        console.log(err);
        res.status(500).send({
        success:false,
        message: "Error in Get Reasturent Api" 
      }); 
    }
}

module.exports = {
    createReasturentController,
    getAllReasturentControll
}