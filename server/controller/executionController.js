const express = require("express");
const codeExecutionModel = require("../model/codeExecution");
const {exec} = require("child_process")
const fs =  require('fs');
const path = require('path');

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

     const tempDir = path.join(__dirname,'../temp');
     if(!fs.existsSync(tempDir)){
        fs.mkdirSync(tempDir);

     }
      
     let filePath , command ; 
  
         const dockerPath = tempDir.replace(/\\/g, "/");
     if(language == 'java'){
        filePath = path.join(tempDir,"Main.java");
        fs.writeFileSync(filePath,code);
     
        command = `docker run --rm -v "${dockerPath}:/app" -w /app eclipse-temurin:17-jdk sh -c "javac Main.java && java Main"`;
     }


     else if(language == 'python'){
        filePath = path.join(tempDir,"script.py");
        fs.writeFileSync(filePath, code);
       
        command = `docker run --rm -v "${dockerPath}:/app" -w /app python:3.10 python3 script.py`;
     }

     else if(language == 'cpp'){
        filePath = path.join(tempDir,"main.cpp");
        fs.writeFileSync(filePath,code); 
 
      command = `docker run --rm -v "${dockerPath}:/app" -w /app gcc:latest sh -c "g++ main.cpp -o main && ./main"`;
     }
   
     exec(`cmd /c ${command}`, { timeout: 20000 }, async (error, stdout, stderr) => {

  console.log("STDOUT:", stdout);
  console.log("STDERR:", stderr);
  console.log("ERROR:", error);

  let output  ; 

  if(error ){
    output = stderr || error.message ;

  }
  else {
    output = stdout;

}
 console.log("STDOUT:", stdout);
console.log("STDERR:", stderr);
console.log("ERROR:", error); 

  await codeExecutionModel.findByIdAndUpdate(execution._id, {
    output,
    status: 'completed'
  });

  return res.status(200).json({
    success: true,
    output
  });
});

}
catch(err){
    console.log(err);

    return res.status(500).json({
        success:false,
        message:"Server Side error"
    })
}
}

exports.executions = async (req, res ) => {

   try{ 

      const userId = req.user.id ; 
      
 
   }
   catch(err){
      console.log(err);
      return res.status(500).json({
         success:false,
         message:"Server Side Error "
      })
   }
}