//require express to connect to app.js
var express = require("express");
var router = express.Router();

//require missing vars
var Campground = require("../models/campground");


//INDEX ROUTE - show all campgrounds
router.get("/", function(req,res) {
    console.log(req.user);
    
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
        }
    });
    // res.render("campgrounds", {campgrounds: campgrounds});
});


//CREATE ROUTE - add new campgrounds to db
router.post("/", function(req,res) {
    //get data from form and add to campgrounds array
    //redirect back to campgrounds page
    //res.send("You hit the post route!");
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name:name, image: image, description: desc};
    //create a new campground and save to db
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
    // campgrounds.push(newCampground);


    
});

//NEW ROUTE = show form to create new campground
router.get("/new", function(req,res) {
    res.render("campgrounds/new.ejs");
});

//SHOW ROUTE - shows more info about one campground
router.get("/:id", function(req, res) {
    //find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            //console.log(foundCampground);
            //render show template with that campground
            // res.send("This will be the showpage someday");
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });

    
});

//export
module.exports = router;
