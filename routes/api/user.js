const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const keys = require("../../config/key")
// Load input validation 
const validateRegisterInput = require("J:/Storage_Vent/Programming_Module/CodingBranch/My Administrative Projetcs/Project-Ganime-Industry-v2/main2/Ganime-Indstustries/validation/signup.js");
const validateLoginInput = require("J:/Storage_Vent/Programming_Module/CodingBranch/My Administrative Projetcs/Project-Ganime-Industry-v2/main2/Ganime-Indstustries/validation/login.js");
// Load User model
const User = require("J:/Storage_Vent/Programming_Module/CodingBranch/My Administrative Projetcs/Project-Ganime-Industry-v2/main2/Ganime-Indstustries/model.js");

// @route POST api/users/register
// @desc Register user
// @access Public
/*router.get('/', (req, res) => {
  res.send("CHUTIYA")
});*/
console.log("PP HEAD")
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
router.get("/", (req, res) => {
    print("YOOOOOO")
    res.send("<h1>POG</h1>")
});
router.post("/signup", (req, res) => {
  console.log("GONE")
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      console.log("NAKA")
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
            console.log("GONE2")
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


  router.post("/login", (req, res) => {
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

  module.exports = router;