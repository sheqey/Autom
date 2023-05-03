
const express = require("express")


const rout = express.Router();


const services = require("../render")

rout.get("/", services.index);
rout.get("/adminpage", services.adminpage);
rout.get("/hotellogin", services.hotelloginp);
rout.get("/hotelcreate", services.hotelcreate);

rout.get("/roomlogin", services.roomlogin);
rout.get("/roomcreate", services.roomcreate);
// rout.post("/addins", services.addins);


rout.get("/forgotpassword", services.forgotpassword);


rout.get("/table", services.table);
rout.get("/update", services.update2);
rout.get("/add", services.add2);

rout.get("/search", services.search);




rout.post("/psearch", services.psearch);
rout.post("/roomslogin", services.roomslogin);
rout.get("/about", services.ab);


rout.get("/edit", services.adit2);       

rout.get("/supdate", services.supdate);
 rout.post("/updatedevice", services.updatedevice);
 rout.post("/updatedevice2", services.updatedevice2);
//rout.post("/ssupdate", services.ssupdate); 
// rout.post("/pupdate", services.pupdate); 
rout.get("/sdelete", services.sdelete); 
rout.get("/sdelete2", services.sdelete2);

rout.get("/logout", services.logout);

rout.get("/org", services.org);

//rout.post("/unilogin", services.unilogin);
rout.post("/hottellogin", services.hotellogin);

rout.post("/addevice", services.addevice);

rout.post("/addevice2", services.addevice2);

rout.get("/enc", services.enc);

//////////////////devices////////////////////////////////////
rout.post("/devices", services.devices);
rout.post("/Alldevices", services.Alldevices);
rout.post("/curtains-on", services.curtains_on);

rout.post("/lights-on", services.lights_on);


rout.post("/turn-off-devices2", services.update_all_devices2);



rout.post("/curtains-on2", services.curtains_on2);

rout.post("/lights-on2", services.lights_on2);


rout.post("/turn-off-devices", services.update_all_devices);


////////////////shar////////////////////////////////////////////////////////////////////

rout.get("/inta", services.inta);
rout.get("/minta", services.minta);
rout.get("/optimize", services.opt);

rout.get("/moptimize", services.opt2);


rout.get("/update2", services.up2);
rout.get("/madd", services.madd);
rout.get("/medit", services.medit);
rout.get("/mview", services.mview);
/////////////////////////////////////////
const path = require("path");

const multer = require('multer');
const folderPath = path.resolve('images/images');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, folderPath); // specify the destination folder for the uploaded files
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname); // use the original file name as the name for the saved file
  }
});

const upload = multer({ storage: storage });

rout.post("/addroom",upload.single('image'), services.addroom);

rout.post("/addhotel",upload.single('image'), services.addhotel);

//rout.post("/pupdate",upload.single('image'), services.pupdate); 


//pupdate",upload.single('image'), services.pupdate); 
rout.post("/updaterooms",upload.single('image'), services.updaterooms); 
rout.post("/updatehotel",upload.single('image'), services.updatehotel); 
//rout.post("/regester",upload.single('image'), services.regesterout.post("/updaterooms",upload.single('image'), services.updaterooms); r);
module.exports = rout;
