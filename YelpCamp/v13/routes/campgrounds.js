//require express to connect to app.js
var express = require("express");
var router = express.Router();

//require missing vars
var Campground = require("../models/campground");
// "../" will move you up one dir
var middleware = require("../middleware/index.js")
// if we require only ""../middleware" it will automatically look for index.js



//INDEX ROUTE - show all campgrounds
router.get("/", function(req,res) {
    //console.log(req.user);
    
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
router.post("/", middleware.isLoggedIn, function(req,res) {
    //get data from form and add to campgrounds array
    //redirect back to campgrounds page
    //res.send("You hit the post route!");
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var desc = req.body.description;
    //req.user cannot be empty because isLoggedIn
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name:name, image: image, price: price, description: desc, author: author};

    //create a new campground and save to db
    Campground.create(newCampground, function(err, newlyCreated) {
        if(err) {
            console.log(err);
        } else {
            //redirect back to campgrounds page
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    });
    // campgrounds.push(newCampground);


    
});

//NEW ROUTE = show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req,res) {
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


// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    //is user logged in? (use a defined middleware)
        Campground.findById(req.params.id, function(err, foundCampground) {
            res.render("campgrounds/edit", {campground: foundCampground});                      
        });
    });


// UPDATE CAMPGROUND ROUTE

router.put("/:id", middleware.checkCampgroundOwnership,function(req, res) {
   // find and update the correct campground
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
       if(err) {
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
   //redirect somewhere (show page)
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership,function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});


//middleware

//Authentication


//export
module.exports = router;
