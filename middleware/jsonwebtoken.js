const jwt = require('jsonwebtoken');


const secretKey = process.env.SECRET_KEY; 
const jwtauthMiddleware = (req,res,next)=>{
    try{
    //Extract the jwt token from the request header
    const token =  req.headers.authorization.split(" ")[1];
    if(!token){
        return res.status(401).json({
            success:false,
            error:'Unauthorized'
        });
    }
     else{
            //verify the jwt token 
            const decoded = jwt.verify(token, secretKey);
        //Attach user info to the request object
        req.user = { _id: decoded.id };
        next();      
        }
    }catch(err){
        console.log("error",err);
        res.status(500).send({
            success:false,
            message:"Error in Auth Api"
        })
    }

}

//function to generate token 
if(!secretKey){
    console.log("Secret key is not set");
}
const generateToken = (userData)=>{
    //generate a new jwt token using userData
    return jwt.sign(userData, secretKey, {expiresIn: "1d"});
}

module.exports = {jwtauthMiddleware, generateToken};