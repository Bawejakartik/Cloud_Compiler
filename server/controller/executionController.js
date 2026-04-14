const express = require("express");
const codeExecutionModel = require("../model/codeExecution");


exports.run = async(req , res) =>{

try{  
         const {language , code  , input } = req.body; 

     if(!language || ! code ) {
        return res.status(400).json({
            success:false,
            message:"Please provide the language and the code for the execution "
        })  
     }

     const allowedLanguage = ['java','python','cpp'];

     if(!allowedLanguage.includes(language)){
        return res.status(400).json({
            success:false,
            message:"Please choose a valid language to execute the code "
        })
     }

     const execution = await codeExecutionModel.create({
        userId: req.user.id,
        language,
        code, 
        input,
        status:'pending'
     })


     return res.status(200).json({
        success:true, 
        message:"Code received successfully",
        data:execution
     })
      

       

}
catch(err){
    console.log(err);

    return res.status(500).json({
        success:false,
        message:"Server Side error"
    })
}
}