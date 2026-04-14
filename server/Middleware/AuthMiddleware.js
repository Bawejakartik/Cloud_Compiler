const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const isAuthenticated = async(req,res,next)=> {
try{
    
     const token = req.cookies.token;
    

     if(!token){
        return res.status(400).json({
            success:false,
            message:"User not authenticated",
        })
     }  

     const decode =  jwt.verify(token , process.env.SECRET_KEY);

        console.log(decode);  

      req.user = {
         id:decode.id 
      }



  if(!decode){
    return res.status(400).json({
        success:false,
        message:"invalid token",
        
    })

  
  } 

    next(); 
    
}
catch(err){
    console.log(err);
    return res.status(500).json({
    success: false,
    message: "Server error"
});
    
    
}
    }


    module.exports = isAuthenticated; 
  
