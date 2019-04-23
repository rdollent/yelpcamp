var express = require("express");
var app = express();

//tell express to serve the folder "public", since it defaults to "views" folder
app.use(express.static("public"));

app.set("view engine", "ejs");

//Routes
app.get("/", function(req,res) {
    res.render("home");
    //res.send("<h1>Welcome to the homepage!<h1>");
});

app.get("/fallinlovewith/:thing", function(req,res) {
    var thing = req.params.thing;
    //res.send("You fell in love with " + thing);
    res.render("love", {thingVar: thing});
});

app.get("/posts", function(req,res) {
    var posts = [
        {title: "Post 1", author: "Susy"},
        {title: "Post 2", author: "Charlie"},
        {title: "Post 3", author: "Colt"},
        
        ];
    res.render("posts", {posts: posts});
});

//Listen
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("SERVER IS LISTENING");
});

