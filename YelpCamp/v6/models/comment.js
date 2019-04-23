var mongoose = require("mongoose");

//create schema
var commentSchema = mongoose.Schema({
    text: String,
    author: String
});

var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;