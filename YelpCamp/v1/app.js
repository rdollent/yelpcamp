var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));


app.set("view engine", "ejs");


var campgrounds = [
    {name: "Salmon Creek", image: "//c1.staticflickr.com/3/2849/11952665455_43536b0abe_b.jpg"},
    {name: "Granite Hill", image: "//c1.staticflickr.com/3/2485/3924264504_d75177e16f_b.jpg"},
    {name: "Mountain Goat's Rest", image: "//c1.staticflickr.com/3/2311/2123340163_af7cba3be7_b.jpg"},
    {name: "Salmon Creek", image: "//c1.staticflickr.com/3/2849/11952665455_43536b0abe_b.jpg"},
    {name: "Granite Hill", image: "//c1.staticflickr.com/3/2485/3924264504_d75177e16f_b.jpg"},
    {name: "Mountain Goat's Rest", image: "//c1.staticflickr.com/3/2311/2123340163_af7cba3be7_b.jpg"},
    {name: "Salmon Creek", image: "//c1.staticflickr.com/3/2849/11952665455_43536b0abe_b.jpg"},
    {name: "Granite Hill", image: "//c1.staticflickr.com/3/2485/3924264504_d75177e16f_b.jpg"},
    {name: "Mountain Goat's Rest", image: "//c1.staticflickr.com/3/2311/2123340163_af7cba3be7_b.jpg"}
    ];

//Routes
app.get("/", function(req,res) {
    res.render("landing");
});

app.get("/campgrounds", function(req,res) {

    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req,res) {
    //get data from form and add to campgrounds array
    //redirect back to campgrounds page
    //res.send("You hit the post route!");
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name:name, image: image};
    campgrounds.push(newCampground);
    //redirect back to campgrounds page
    res.redirect("/campgrounds");
    
});

app.get("/campgrounds/new", function(req,res) {
    res.render("new.ejs");
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp server has started");
});

