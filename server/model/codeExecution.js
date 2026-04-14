const mongoose = require('mongoose');

const codeExecution = mongoose.Schema({

    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true,

    },
    language:{
        type:String ,
        required:true,
    },
    code:{
        type:String ,
       

    },
    input:{
        type:String , 
    
    },
    output:{
        type:String , 
     

    },
    error:{
        type:String ,
    

    },
    status:{
        type:String,
        enum: ['pending','running','success','error'],
        default:'pending'
    },
    executionTime:{
        type:Number,
       

    },

},{timestamps:true});

const codeExecutionModel = mongoose.model("codeExecutions",codeExecution);


module.exports = codeExecutionModel; 



