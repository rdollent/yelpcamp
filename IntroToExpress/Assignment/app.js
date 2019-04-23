//express app vars
var express = require("express");
var app = express();


//Routes
// "/"
app.get("/", function(req,res) {
    res.send("Hi there, welcome to my assignment!");
});

// "/" + animal
// "/:animal"
app.get("/speak/:animal", function(req,res){
    var param = req.params.animal.toLowerCase();
    var animalSounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof Woof!"
    };
    res.send("The " + param + " says \'" + animalSounds[param] + "\'");
});

// "/repeat" + word + number of repetition
app.get("/repeat/:word/:num", function(req,res) {
    var word = req.params.word;
    var num = Number(req.params.num);
    var arr = [];
    for(var i = 0; i < num; i++) {
        arr.push(word);
    }
    var str = arr.join(" ");
    res.send(str);
});


//all other pages
app.get("*", function(req, res) {
    res.send("Sorry, page not found...What are you doing with your life?");
});


//Listen for requests
app.listen(process.env.PORT,process.env.IP, function() {
    console.log("SERVER IS CONNECTED");
});