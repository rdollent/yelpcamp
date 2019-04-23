//require express to connect to app.js
var express = require("express");
var router = express.Router();

//require missing vars
var passport = require("passport");
var User = require("../models/user");


// Routes

//root route
router.get("/", function(req,res) {
    res.render("landing");
});



// =============
// Auth routes
// =============

//show register form
router.get("/register", function(req, res) {
    res.render("register");
});

//handle signup logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/campgrounds");
        });
    });
});

// show login form
router.get("/login", function(req, res) {
    res.render("login");
});

//handling login logic
//app.post("/login", middleware, callback)
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
        //callback does not do anything. Can remove if we want to
});

// logout route
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
});


//middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
}

module.exports = router;