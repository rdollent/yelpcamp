var express = require('express');
var app = express();

//console.log(app);
//console.log(app.get);

// '/' => 'Hi There!'
app.get("/", function(req,res) {
    res.send("Hi there!");
});

// "/bye" => "Goodbye!"
app.get("/bye", function(req,res) {
    res.send("Goodbye!");
});

// "/dog" => "MEOW!"
app.get("/dog", function(req,res) {
    res.send("MEOW!");
    console.log(res);
});
//route parametres or route variables/path variables
//using reddit
//use colon in front of variable
app.get("/r/:subredditName", function(req, res) {
    console.log(req.params.subredditName);
    var subreddit = req.params.subredditName;
    res.send("WELCOME TO " + subreddit.toUpperCase() + " SUBREDDIT!");  
});

app.get("/r/:subredditName/comments/:id/:title/", function(req,res) {
    console.log(req.params);
    res.send("WELCOME TO THE COMMENTS PAGE!");
});

//use for dir that does not exist
//put it after other routes, * means catch-all
//order of routes matters!
app.get("*", function(req,res) {
    res.send("YOU ARE A STAR!!!");
});

//Tell Express to listen for requests (start server)

app.listen(process.env.PORT, process.env.IP,function() {
    console.log("Server has started!!!");
});

//console.log(process.env.PORT, process.env.IP);

