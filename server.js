//var http = require('http'); // Import Node.js core module
//var fs = require('fs');
var express = require('express')
let result = [];
var path = require('path')
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000
const app = express(); 
const users = require("J:/Storage_Vent/Programming_Module/CodingBranch/My Administrative Projetcs/Project-Ganime-Industry-v2/main2/Ganime-Indstustries/routes/api/user.js");
//J:\\The_Storage_Vent\\Programming_Module\\Coding Branch\\My Administrative Projetcs\\Project-Ganime-Industry-v2\\main2\\Ganime-Indstustries\\
const passport = require("passport");
//const passport = require("J:\\The_Storage_Vent\\Programming_Module\\Coding Branch\\My Administrative Projetcs\\Project-Ganime-Industry-v2\\main2\\Ganime-Indstustries\\config\\passport.js");
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
//let users= require("J:\\The_Storage_Vent\\Programming_Module\\Coding Branch\\My Administrative Projetcs\\Project-Ganime-Industry-v2\\message.json");
const { count } = require('console');
const { Int32 } = require('mongodb');
const { type } = require('os');
const router1 = require('J:/Storage_Vent/Programming_Module/CodingBranch/My Administrative Projetcs/Project-Ganime-Industry-v2/main2/Ganime-Indstustries/routes/api/user.js');

app.use(bodyParser.urlencoded({ extended: true })); 
const db = require("J:/Storage_Vent/Programming_Module/CodingBranch/My Administrative Projetcs/Project-Ganime-Industry-v2/main2/Ganime-Indstustries/config/key.js").mongoURI;
mongoose.connect(db, { useNewUrlParser: true }, { useUnifiedTopology: true });
/*app.post('/pages/signup.html', async (req, res) => {
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
        /*result = await Notes.findOne({fname:req.body.fname});
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
app.post('/pages/login.html', async (req, res) => {
    console.log("YAS")
    x = req.body.fname;
    y = req.body.lname;
    try {
    let result1 = await Notes.findOne({fname:x})
    console.log(result1.fname);
    x1 = result1.fname;
    let result2 = await Notes.findOne({lname:y})
    console.log(result2.lname);
    y1 = result2.lname;
    if(x1 == x && y1 == y ) {
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
});*/
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("J:\\Storage_Vent\\Programming_Module\\CodingBranch\\My Administrative Projetcs\\Project-Ganime-Industry-v2\\main2\\Ganime-Indstustries\\config\\key.js");
// Load input validation J
const validateRegisterInput = require("J:\\Storage_Vent\\Programming_Module\\CodingBranch\\My Administrative Projetcs\\Project-Ganime-Industry-v2\\main2\\Ganime-Indstustries\\validation\\signup.js");
const validateLoginInput = require("J:\\Storage_Vent\\Programming_Module\\CodingBranch\\My Administrative Projetcs\\Project-Ganime-Industry-v2\\main2\\Ganime-Indstustries\\validation\\login.js");
// Load User model
const User = require("J:\\Storage_Vent\\Programming_Module\\CodingBranch\\My Administrative Projetcs\\Project-Ganime-Industry-v2\\main2\\Ganime-Indstustries\\model.js");

app.post("/signup", (req, res) => {
  console.log("GONE121")
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.Notes.findOne({ fname: req.body.fname }).then(user => {
      if (user) {
        return res.status(400).json({ fname: "Name already exists" });
      } else {
        const newUser = new User.Notes({
          lname: req.body.lname,
          fname: req.body.fname,
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.lname, salt, (err, hash) => {
            if (err) throw err;
            console.log("GONE212")
            newUser.lname = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });

app.get("/", (req, res) => {
    res.send("<h1>DEEZE NUTZ</h1>")
});

  app.post("/login", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const fname = req.body.fname;
    const lname = req.body.lname;
  // Find user by email
    User.Notes.findOne({ fname }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Name not found" });
      }
  // Check password
      bcrypt.compare(lname, user.lname).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.fname
          };
  // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });

app.use(passport.initialize());
require("J:\\Storage_Vent\\Programming_Module\\CodingBranch\\My Administrative Projetcs\\Project-Ganime-Industry-v2\\main2\\Ganime-Indstustries\\config\\passport")(passport);
// Passport middleware
// Routes
app.use("E:\\The_Storage_Vent\\Programming_Module\\Coding Branch\\My Administrative Projetcs\\Project-Ganime-Industry-v2\\main2\\Ganime-Indstustries\\routes\\api\\user", users);
//app.use(express.static(path.join(__dirname, 'public')))
//app.set('views', path.join(__dirname, 'views'))
//app.set('view engine', 'ejs')
//app.get('/', (req, res) => res.render('index'))
app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "client/public/index.html"));
});
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
