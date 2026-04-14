const mongoose =require("mongoose");

const userSchema = mongoose.Schema({
       
    Fullname:{
        type : String, 
        required:true,

    },

    Username :{
        type:String , 
        required:true,
        unique:true,
         

    },

    Email :{
        type:String , 
        required:true,
        unique:true,
    },

    Password:{
        type:String, 
        required:true,

    }
}, 
{timestamps:true});


const userModel = mongoose.model("users",userSchema);

module.exports = userModel; 

