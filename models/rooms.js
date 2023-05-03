const mongoose = require("mongoose");



var mrooms = new mongoose.Schema({
       
    name:{
        type:String,
        required:true
    },
    roomid:{
        type:String,
        required:true
    },
    hotelid:{
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
    }

 
    
    });

    const rooms = mongoose.model('rooms',mrooms);
    module.exports = rooms;