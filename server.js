//var http = require('http'); // Import Node.js core module
//var fs = require('fs');
var express = require('express')
let result = [];
var path = require('path')
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000
const app = express();
const fs = require('fs');
const mongoose = require("mongoose");
let x = null;
let y = null;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:8000/";
let z = "";
const { Notes } = require('./model.js');
const { Count } = require('./model.js');
let lol = "";
let users= require("E:\\The_Storage_Vent\\Programming_Module\\Coding Branch\\My Administrative Projetcs\\Project-Ganime-Industry-v2\\message.json");
const { count } = require('console');
const { Int32 } = require('mongodb');
const { type } = require('os');

app.use(bodyParser.urlencoded({ extended: true })); 
mongoose.connect("mongodb+srv://Ganime_Dewer:jamshedpur_1000@ganimeindustries1000.rkmonvc.mongodb.net/data", { useNewUrlParser: true }, { useUnifiedTopology: true });
app.post('/pages/signup.html', async (req, res) => {
  /*z = getCount();
  console.log(z);
  z = parseInt(z);
  console.log(z);
  z = z + 1;
  console.log(z);
  z = (z).toString();
  console.log(z);
  let newCount = new Count ({
          count: z
      });
      newCount.save();*/
        result = await Notes.findOne({fname:req.body.fname});
        let xyz = null;
        if( req.body.fname == "" && req.body.lname == "") {
          console.log("Empty shit not allowed");
          res.redirect('signup.html');
        } else if (result != xyz && !(req.body.fname == "" && req.body.lname == "")) {
          console.log("Alredy Taken");
          res.redirect('signup.html');
        } else {    
          x = req.body.fname;
          y = req.body.lname;
          let newNote = new Notes ({
              fname: x,
              lname: y
          });
          newNote.save();
          console.log("SIGNUP SUCCESS")
          res.redirect('login.html');    
      }
});
app.post('pages/login.html', async (req, res) => {
    console.log("YAS")
    x = req.body.fname;
    y = req.body.lname;
    try {
    const result1 = await Notes.findOne({fname:x})
    console.log(result1.fname);
    x1 = result1.fname;
    const result2 = await Notes.findOne({fname:x})
    console.log(result2.lname);
    y1 = result2.lname;
    if(x1 === x && y1 === y ) {
        console.log("LOGIN SUCCESS")
        res.redirect('/');
    } else {
        if(x1 != "" && y1 != "") {
          console.log("Empty shit not allowed");
          res.redirect('login.html');
        } else {
          console.log("NAME DOESNT MATCH ANY RESULT IN SERVER.");
          res.redirect('login.html');
        }
      }}
      catch {
        console.log("ACCOUNT DOESNT EXIST")
        res.redirect('login.html')
      }
    //res.redirect('home.html');
});
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('index'))
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
