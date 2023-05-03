const mongoose = require("mongoose");

var hotss = new mongoose.Schema({
   
  
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    hotelid: {
        type: String,
        required: true
      }
      
    
    });

    const huser = mongoose.model('hotels',hotss );
    module.exports = huser;
