const mongoose = require("mongoose");



var ddevices = new mongoose.Schema({
       
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
    status:{
        type:String,
        required:true
    },
   
    id:{
        type:String,
        required:true
    }
,type:{
        type:String,
        required:true
    },
 
    
    });

    const d = mongoose.model('ddevices',ddevices);
module.exports = d;
