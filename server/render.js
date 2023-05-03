
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const hotels = require("../models/user")
const device = require("../models/devices")
const rooms = require("../models/rooms")
const axios = require('axios')
const { response } = require("express");
const { Console } = require("console");
const { start } = require("repl");
//const { data } = require("cheerio/lib/api/attributes")
const uniqid = require('uniqid');



////////////////////sharrr/////////////////


exports.inta = async (req,res)=>{
  const uid = req.session.uid
  const data = await rooms.findOne({roomeid:uid});
  const data2 = await rooms.find({roomid:uid});
      const light = await device.find({ type: 'lighting', roomid: uid });
      
     const water = await device.find({ type: 'water', roomid: uid });
     
     
   const curtain = await device.find({ type: 'smart-curtain', roomid: uid });
  
  const devices = await device.find({ type: 'smart-devices', roomid: uid });
  res.render("ainte",{data:data,data2:data2,light,water,curtain, devices})
   
 
}
exports.minta = async (req,res)=>{
  const uid = req.session.uid
  const data = await hotels.findOne({hotelid:uid});
//  const data2 = await //gradinfo.find({uniid:uid});
          
const light = await device.find({ type: 'lighting', hotelid: uid });
      
     const water = await device.find({ type: 'water', hotelid: uid });
     
     
   const curtain = await device.find({ type: 'smart-curtain', hotel: uid });
  
  const devices = await device.find({ type: 'smart-devices', hotel: uid });
  res.render("minte",{data,light,water,curtain, devices});
   
 
  } 
 



//////////////////where update status happens////////////////
exports.devices = async (req, res) => {
  try {
    console.log(req.body)
    var id = req.query.id
    console.log(id)
    var status = req.body.status === 'on' ? 'off' : 'on'
    console.log(status)
    await device.findByIdAndUpdate(id, { status: status })
    res.sendStatus(200)
  } catch (err) {
    console.error('Error updating device:', err)
    res.status(500).send('Error updating device')
  }
}




exports.Alldevices = async (req, res) => {
  try {
    console.log(req.body, req.query.type )
    
  

   
    await device.updateMany({ type: req.query.type }, { status: req.body.status });

    res.sendStatus(200)
  } catch (err) {
    console.error('Error updating device:', err)
    res.status(500).send('Error updating device')
  }
}





exports.curtains_on = async (req, res) => {
  try {
    const roomId = req.session.uid;
    console.log(roomId)
    await device.updateMany({ roomid: roomId, type: 'smart-curtain' }, { status: 'on' });

    res.sendStatus(200);
  } catch (err) {
    console.error('Error turning off all curtains:', err);
    res.status(500).send('Error turning off all curtains');
  }
}


exports.curtains_on2 = async (req, res) => {
  try {
    const roomId = req.session.uid;
    console.log(roomId)
    await device.updateMany({ hotelid: req.session.uid, type: 'smart-curtain' }, { status: 'on' });

    res.sendStatus(200);
  } catch (err) {
    console.error('Error turning off all curtains:', err);
    res.status(500).send('Error turning off all curtains');
  }
}




exports.update_all_devices = async (req, res) => {
  try {
    console.log(req.body, req.query.type )
    
  

   
    await device.updateMany({ roomid: req.session.uid }, { status: "off"});

    res.sendStatus(200)
  } catch (err) {
    console.error('Error updating device:', err)
    res.status(500).send('Error updating device')
  }
}


exports.update_all_devices2 = async (req, res) => {
  try {
    console.log(req.body, req.query.type )
    
  

   
    await device.updateMany({ hotelid: req.session.uid }, { status: "off"});

    res.sendStatus(200)
  } catch (err) {
    console.error('Error updating device:', err)
    res.status(500).send('Error updating device')
  }
}




/////////////////////////////////////
exports.opt = async (req,res)=>{
  const uid = req.session.uid
  const data = await rooms.findOne({roomid:uid});
  const data2 = await rooms.find({roomid:uid});
          
  
  res.render("opt",{data:data,data2:data2})
   
 
}

exports.lights_on = async (req, res) => {
  try {
    const roomId = req.session.uid;
    console.log(roomId)
    await device.updateMany({ roomid: roomId, type: 'lighting' }, { status: 'on' });

    res.sendStatus(200);
  } catch (err) {
    console.error('Error turning off all curtains:', err);
    res.status(500).send('Error turning off all curtains');
  }
}

exports.lights_on2 = async (req, res) => {
  try {
    const roomId = req.session.uid;
    console.log(roomId)
    await device.updateMany({ hotelid: roomId, type: 'lighting' }, { status: 'on' });

    res.sendStatus(200);
  } catch (err) {
    console.error('Error turning off all curtains:', err);
    res.status(500).send('Error turning off all curtains');
  }
}


exports.opt2 = async (req,res)=>{
  const uid = req.session.uid
  const data = await hotels.findOne({hotelid:uid});
  const data2 = await hotels.find({uniid:uid});
          
  
  res.render("opt2",{data:data,data2:data2})
   
 
}




exports.up2 = async (req,res)=>{
  const uid = req.session.uid
  const data = await hotels.findOne({hotelid:uid});
  const data2 = await hotels.findOne({hotelid:uid});
  res.render("update",{data:data,data2:data2})
}



exports.madd = async (req,res)=>{
  const uid = req.session.uid
  const data = await hotels.findOne({hotelid:uid});
const data2 = await rooms.find({hotelid:uid});
  res.render("madd",{data:data,data2:data2})
}




exports.medit= async (req,res)=>{
  const uid = req.session.uid
  const data = await hotels.findOne({hotelid:uid});
const data2 = await device.findById(req.query.id);
  res.render("medit",{data:data,data2})
}




exports.mview= async (req,res)=>{
  const uid = req.session.uid
  const data = await hotels.findOne({hotelid:uid});
  const data2 = await device.find({hotelid:uid});
  
  
  res.render("mview",{data:data,data2:data2})
}




///////////////////////////////////////////

exports.index = async (req,res)=>{
  // if (req.session.uid) {
      
  // } else {
   
  //   res.redirect("/login")
  // }


    
          res.render("index")
   
 
}



exports.hotelloginp = async (req,res)=>{   
          res.render("hotellogin")
}


exports.hotelcreate = async (req,res)=>{ 


  res.render("hotelcreate")
}



exports.roomlogin = async (req,res)=>{
   
  res.render("roomlogin")
}


exports.roomcreate = async (req,res)=>{
   
  const data = await hotels.find();
  res.render("roomcreate",{data:data})
}



exports.adminpage = async (req, res) => {
  const uid = req.session.uid;
  const data2 = await rooms.findOne({ roomid: uid });
  const data = await rooms.findOne({ roomid: uid });

  // Find all devices where type is "lighting" and roomId is xx
  const light = await device.find({ type: 'lighting', roomid: uid });

 const water = await device.find({ type: 'water', roomid: uid });
 
 const curtain = await device.find({ type: 'smart-curtain', roomid: uid });
 
const devices = await device.find({ type: 'smart-devices', roomid: uid });
 
 
 
  res.render('tables', { data, data2, light,water,curtain,devices});
};





exports.forgotpassword = async (req,res)=>{
   
  res.render("forgotpassword")
}



exports.table = async (req,res)=>{
   
  const uid = req.session.uid
  const data = await hotels.findOne({hotelid:uid});
  const data2 = await gradinfo.find({uniid:uid});
  res.render("tables",{data:data,data2:data2})
}



exports.update2 = async (req,res)=>{
  const uid = req.session.uid
  const data = await rooms.findOne({roomid:uid});
  const data2 = await rooms.findOne({roomid:uid});
  res.render("update2",{data:data,data2:data2})
}



exports.add2 = async (req,res)=>{
   
  const uid = req.session.uid
  const data = await rooms.findOne({roomid:uid});
  res.render("add",{data:data,uid:uid})
}




exports.adit2 = async (req,res)=>{
   
 

  const uid = req.session.uid
  const data = await rooms.findOne({roomid:uid});
  const data2 = await device.find({roomid:uid});





  res.render("edit",{data:data,data2:data2 })
  
}



// exports.adit2 = async (req,res)=>{
   
//   const uid = req.session.uid
//   const data = await hotels.findOne({uid:uid});
//   const data2 = await gradinfo.find();
//   res.render("edit",{data:data,data2:data2})
// }


exports.supdate = async (req,res)=>{
   console.log(req.query.id)
  const uid = req.session.uid

  const data = await rooms.findOne({roomid:uid});

 const data2 = await device.findById(req.query.id);
 console.log(data2)
  res.render("supdate",{data:data,data2:data2})
}



exports.updatedevice = async (req,res)=>{
  var id = req.query.id;
  console.log("hit update device//////////////////////////////////////////////////////////////////////")
  device.findByIdAndUpdate(id, req.body)
    .then(
      data => {
        if (!data) {
          return res.status(500).send({ message: `Sorry, we can't find a device with an ID of ${id}` });
        } else {
          res.redirect("/adminpage");
        }
      }
    )
    .catch(err => {
      res.status(500).send({ message: err.message || "errrorrr" });
    });
}

exports.updatedevice2 = async (req,res)=>{
  var id = req.query.id;
  console.log("hit update device//////////////////////////////////////////////////////////////////////")
  device.findByIdAndUpdate(id, req.body)
    .then(
      data => {
        if (!data) {
          return res.status(500).send({ message: `Sorry, we can't find a device with an ID of ${id}` });
        } else {
          res.redirect("/org");
        }
      }
    )
    .catch(err => {
      res.status(500).send({ message: err.message || "errrorrr" });
    });
}


//////////room update//////

exports.updaterooms =  (req,res)=>{
  var id = req.query.id;
  
  console.log("////////////////////")
  console.log(id)
  console.log(req.body)
  rooms.findByIdAndUpdate(id, {
      name: req.body.name,
      image: req.file.originalname,
      password: req.body.password
      }
      )
    .then(
      data => {
        if (!data) {
          return res.status(500).send({ message: `Sorry, we can't find a device with an ID of ${id}` });
        } else {
          res.redirect("/adminpage");
        }
      }
    )
    .catch(err => {
      res.status(500).send({ message: err.message || "errrorrr" });
    });
}



exports.updatehotel =  (req,res)=>{
  var id = req.query.id;
  
  console.log("////////////////////")
  console.log(id)
  console.log(req.body)
  hotels.findByIdAndUpdate(id, {
      name: req.body.name,
      image: req.file.originalname,
      password: req.body.password
      }
      )
    .then(
      data => {
        if (!data) {
          return res.status(500).send({ message: `Sorry, we can't find a device with an ID of ${id}` });
        } else {
          res.redirect("/org");
        }
      }
    )
    .catch(err => {
      res.status(500).send({ message: err.message || "errrorrr" });
    });
}





exports.sdelete = (req,res)=>{

  var id = req.query.id
  device.findByIdAndDelete(id)
          .then(data =>{
              
            
              
          })
     
          res.redirect("/adminpage")

}

exports.sdelete2 = (req,res)=>{

  var id = req.query.id
  device.findByIdAndDelete(id)
          .then(data =>{
              
            
              
          })
     
          res.redirect("/org")

}


exports.addroom =(req,res)=>{

  console.log(req.body)
  console.log(req.file.originalname)
  const newroom = new rooms({
  
      name:req.body.name,
      roomid:uniqid.time().slice(-6),
      password:req.body.password,
      hotelid:req.body.hotelid,
      image:req.file.originalname,
  
     
  
  })
  
  newroom
       .save(newroom)
       .then(data =>{ 
  //  console.log(data)
       })
     
       res.redirect("/roomlogin")
  }
  

  exports.pupdate = async (req,res)=>{
    var id = req.query.id;
    console.log(id)
    console.log(req.body)
    hotels.findByIdAndUpdate(id, {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      image:req.file.originalname
    })
      .then(
        data => {
          if (!data) {
            return res.status(500).send({ message: `Sorry, we can't find a student with an ID of ${id}` });
          } else {
            res.redirect("/adminpage");
          }
        }
      )
      .catch(err => {
        res.status(500).send({ message: err.message || "errrorrr" });
      });
  }




  exports.addevice =(req,res)=>{

     console.log(req.body)
    

    
   
  const dd = new device({
    
       name: req.body.name,
       id: req.body.id,
       type:req.body.type,
       roomid:req.body.roomid,
       hotelid:req.session.hotelid,
       status:"off",
       
    
    })
    
    dd
         .save(dd)
        .then(data =>{ 
      console.log(data)
        })
       
         res.redirect("/adminpage")
    }


exports.addevice2 =(req,res)=>{

     console.log(req.body)
    

    
   
  const dd = new device({
    
       name: req.body.name,
       id: req.body.id,
       type:req.body.type,
       roomid:req.body.roomid,
       hotelid:req.session.uid,
       status:"off",
       
    
    })
    
    dd
         .save(dd)
        .then(data =>{ 
      console.log(data)
        })
       
         res.redirect("/org")
    }



    exports.addhotel =(req,res)=>{

      console.log(req.body)
      console.log(req.file.originalname)
      const newhot = new hotels({
      
          name:req.body.name,
         
          password:req.body.password,
          hotelid:uniqid.time().slice(-6),
          image:req.file.originalname,
          // uid:uniqid.time().slice(-6)
         
      
      })
      
      newhot
           .save(newhot)
           .then(data =>{ 
      //  console.log(data)
           })
         
           res.redirect("/hotellogin")
      }
    

      exports.hotellogin = async (req,res)=>{
        console.log("hit login page1")
        console.log(req.body)
       // Find a user with the matching email
       hotels.findOne({ name: req.body.name }, (err, hotels) => {
         if (err) {
           // If there is an error, send a 500 status code
           console.log("errrr not found")
         }
     
         if (!hotels) {
           // If there is no user with the matching email, send a 401 status code
           console.log("not found")
           res.redirect("/hotellogin")
         }
         if(hotels){
             if (hotels.password === req.body.password) {
                 console.log('The strings are equal');
                 req.session.uid = hotels.hotelid
              
                 res.redirect("/org")
               } else {
                 console.log('The strings are not equal');
                 console.log(hotels.password)
                 res.redirect("/hotellogin")
               }
         }
       
         // Compare the provided password with the hashed password in the database
        
       });
     
        
       };
    
  
       exports.org = async (req,res)=>{
   
        const uid = req.session.uid
        console.log(uid)
        const data = await hotels.findOne({hotelid:uid});
      const data2 = await hotels.findOne({hotelid:uid});
      const light = await device.find({ type: 'lighting', hotelid:req.session.uid });

 const water = await device.find({ type: 'water', hotelid:req.session.uid });
 
 const curtain = await device.find({ type: 'smart-curtain', hotelid:req.session.uid });
 
const devices = await device.find({ type: 'smart-devices', hotelid:req.session.uid });
 
        res.render("search",{data:data,data2:data2,light,curtain,devices,water})
      }

      exports.search = async (req,res)=>{
   
        const uid = req.session.uid
        const data = await hotels.findOne({hotelid:uid});
      
        // data2 now contains an array of all gradinfo records with the same name and id as in req.body
            const light = await device.find({ type: 'lighting', hotelid:req.session.uid });

 const water = await device.find({ type: 'water', hotelid:req.session.uid });
 
 const curtain = await device.find({ type: 'smart-curtain', hotelid:req.session.uid });
 
const devices = await device.find({ type: 'smart-devices', hotelid:req.session.uid });
 
        res.render("search",{data:data,light,curtain,devices,water})
      
        res.render("search",{data:data,light,curtain,water,devices})
      }



      exports.psearch = async (req,res)=>{
        console.log(req.body)



        const encryptionKey = {
          a: "vv",
          b: "4d",
          c: "t8",
          d: "r5",
          e: "lf",
          f: "t9",
          g: "p3",
          h: "p8",
          i: "0f",
          j: "1k",
          k: "h5",
          l: "2s",
          m: "b7",
          n: "q3",
          o: "6a",
          p: "g6",
          q: "8d",
          r: "u4",
          s: "v9",
          t: "7e",
          u: "j6",
          v: "c4",
          w: "y9",
          x: "z4",
          y: "a2",
          z: "s1",
          0: "o2",
          1: "m3",
          2: "n4",
          3: "q5",
          4: "e3",
          5: "f8",
          6: "l9",
          7: "i5",
          8: "r1",
          9: "k2"
        };
        
        // Decryption key object
        const decryptionKey = Object.fromEntries(
          Object.entries(encryptionKey).map(([key, value]) => [value, key])
        );
        
        // Encryption function
        function encrypt(input) {
          let result = "";
          for (let i = 0; i < input.length; i++) {
            const char = input[i].toLowerCase();
            if (encryptionKey[char]) {
              result += encryptionKey[char];
            } else {
              result += char;
            }
          }
          return result;
        }
        
        // Decryption function
        function decrypt(input) {
          let result = "";
          let i = 0;
          while (i < input.length) {
            const char = input.slice(i, i + 2);
            if (decryptionKey[char]) {
              result += decryptionKey[char];
              i += 2;
            } else {
              result += input[i];
              i++;
            }
          }
          return result;
        }
      
      
      












        const uid = req.session.uid
        const data = await hotels.findOne({hotelid:uid});

        const data2 = await gradinfo.find({
          name: { $regex: new RegExp(encrypt(req.body.name), "i") },
          idno: { $regex: new RegExp(encrypt(req.body.id), "i") }
        });
var name = encrypt(req.body.name)
var id = encrypt(req.body.id)
console.log("name    " + name)
console.log("id    " + id)
        console.log(data2)
        res.render("appinfo",{data:data,data2:data2})
      }


  exports.roomslogin = async (req,res)=>{
    console.log("hit login page1")
    console.log(req.body)
   // Find a user with the matching email
   rooms.findOne({ name: req.body.name }, (err, rooms) => {
     if (err) {
       // If there is an error, send a 500 status code
       console.log("errrr not found")
     }
 
     if (!rooms) {
       // If there is no user with the matching email, send a 401 status code
       console.log("not found")
       res.redirect("/roomlogin")
     }
     if(rooms){
         if (rooms.password === req.body.password) {
             console.log('The strings are equal');
             req.session.uid = rooms.roomid
          
  req.session.hotelid = rooms.hotelid
             res.redirect("/adminpage")
           } else {
             console.log('The strings are not equal');
             console.log(rooms)
             res.redirect("/roomlogin")
           }
     }
   
     // Compare the provided password with the hashed password in the database
    
   });
 
    
   };


  exports.ab = async (req,res)=>{
   

  
    
   res.render("aboutu")
   
  };

/////////////////add user///////////////////////////////////////////////////////////////////////
exports.regester =(req,res)=>{
    console.log(req.body)
    console.log(req.file.originalname)
    const newuser = new user({
     
        email:req.body.email,
        password:req.body.password,
        uid:req.body.email, 
        image:req.file.originalname
       
    
    })
    
    newuser
         .save(newuser)
         .then(data =>{ 
     console.log(data)
         })
       
         res.redirect("../login")
    }
/////////////add new docter///////////////////////////////////////////////////////////////////////////

    exports.home = (req,res)=>{

      res.render("home")
  }
  
   

exports.about = (req,res)=>{

  res.render("about")
}


exports.enc = (req,res)=>{

  res.render("enc")
}


exports.logout = (req,res)=>{
// destroy session and redirect to login page
req.session.destroy();
res.redirect("/");

}












/////////constant functions/////////


    
    
  






