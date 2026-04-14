const express = require('express');
const user = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();


exports.signup = async ( req, res) => {
  
     try{
      
              const {Fullname , Username ,Email , Password} = req.body; 

              if(!Fullname || !Username || !Email  || !Password){
                return res.status(400).json({
                    success:false,
                    message:"All the fields are required"
                })
              }

              const existingUser = await user.findOne({Email});

              if(existingUser){
                return res.status(400).json({
                    success:false,
                    message:"User Already exists "
                })
              }

              const hashedPassword = await bcrypt.hash(Password,10);
                  
              const newUser = await user.create({
                Fullname,

                Username,
                Email,
                Password:hashedPassword,

              });

              return res.status(200).json({
                success:true,
                message:"User created successfully "
              })



     }
     catch(err){
        console.log(err);

        return res.status(500).json({
            success:false,
            message:"User not registered , try again later "
        })
     }
}

exports.login  = async (req , res)  => {
     


     try { 
        
        const {  Email , Password}  = req.body; 

    if( !Email || !Password){
        return res.status(400).json({
            success:false,
            message:"All the fields are required "
        })
    }


        const  User  = await user.findOne({Email});


         if(!User){
            return res.status(400).json({
                success:false,
                message:"User not registered"
            })
         }
             const payload = {
                id:User._id,

             }
         if(await bcrypt.compare(Password, User.Password)){
          const token = jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"2h"});
      
const option = {
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token",token,option).status(200).json({
        success:true,
        message:"user loggedIn successfully",
        token,

      })
         }


         else {
            return res.status(401).json({
                success:false,
                message:"your password is incorrect so fill the correct criedntials"
            })
         }

         
     }
     catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"server side error "
        })
     }
}