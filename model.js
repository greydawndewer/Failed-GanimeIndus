const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    fname: String,
    lname: String,
//    count: String
});
const countSchema = new mongoose.Schema({
    count: String
});

const Notes = mongoose.model("Note", notesSchema);
const Count = mongoose.model("Count", countSchema);
module.exports = {
    Notes, Count
}