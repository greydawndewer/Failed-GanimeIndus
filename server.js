//var http = require('http'); // Import Node.js core module
//var fs = require('fs');
var express = require('express')
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
//const { Count } = require('./model.js');

let users= require("E:\\The_Storage_Vent\\Programming_Module\\Coding Branch\\My Administrative Projetcs\\Project-Ganime-Industry-v2\\message.json");
const { count } = require('console');
const { Int32 } = require('mongodb');
const { type } = require('os');

app.use(bodyParser.urlencoded({ extended: true })); 
mongoose.connect("mongodb+srv://Ganime_Dewer:jamshedpur_1000@ganimeindustries1000.rkmonvc.mongodb.net/data", { useNewUrlParser: true }, { useUnifiedTopology: true });
/*
const notesSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  count: String
});
const countSchema = new mongoose.Schema({
  count: String
});
//const Note = mongoose.model("Note", notesSchema);
const Count = mongoose.model("Count", countSchema)

const getDocument = async () => {
  const result = await Count.find()
  .select({fname:1});
  console.log(result[result.length - 1].fname);
  return result[result.length - 1].fname;
}
const getCount = async () => {
  const result = await Count.find();
  console.log(result[result.length - 1].count);
  return "0";

}
app.post('/', (req, res) => {
  z = getCount();
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
      newCount.save();
      console.log("err");
      /*let yzd = getCount();
      x = req.body.fname;
      y = req.body.lname;
      let newNote = new Note ({
          fname: x,
          lname: y,
          count: yzd 
});
      newNote.save();
      console.log(getCount());
      res.redirect('/');
});/*/
app.post('/pages/home', (req, res) => {
  //res.send(`Full name is:${req.body.fname} ${req.body.lname}.`);
  const schema = {
    fname: String,
    lname: String
  }
  const Note = mongoose.model("Note", schema);
     x = req.body.fname;
     y = req.body.lname;
      let newNote = new Note ({
          fname: x,
          lname: y,
});
      newNote.save();
      res.send("<h1>Your Name is : " + x + " " + y + "." + "</h1>");
      res.redirect('/pages/home.html');
});
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('index'))
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
