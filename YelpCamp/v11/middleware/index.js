// all middleware goes here
var middlewareObj = {};

//require vars
var Campground = require("../models/campground");
var Comment = require("../models/comment");

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
//Authorization

if(req.isAuthenticated()) {
    // does user own the campground?
    Campground.findById(req.params.id, function(err, foundCampground) {
        if(err) {
            req.flash("error", "Campground not found");
            res.redirect("back");
        } else {
            // does user own the campground?
            //note: req.user._id is a string!
            //foundCampground.author.id is a Mongoose object!
            //console.log(foundCampground.author.id, req.user._id);
            if(foundCampground.author.id.equals(req.user._id)) {
                //res.render("campgrounds/edit", {campground: foundCampground});
                next()
            } else {
                req.flash("error", "You don't have permission to do that");
                //res.send("You do not have permission to do that");
                res.redirect("back");
            }
     
        }
    });
} else {
    req.flash("error", "You need to be logged in to do that");
    //console.log("you need to be logged in");
    //res.send("you need to be logged in");
    res.redirect("back"); //take user back to where they came from
}

   
    
    
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
//Authorization
if(req.isAuthenticated()) {
    // does user own the comment?
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err) {
            res.redirect("back");
        } else {
            // does user own the comment?
            //note: req.user._id is a string!
            //foundComment.author.id is a Mongoose object!
            //console.log(foundComment.author.id, req.user._id);
            //check models/comment.js for schema!
            if(foundComment.author.id.equals(req.user._id)) {
                //res.render("campgrounds/edit", {campground: foundCampground});
                next()
            } else {
                req.flash("error", "You don't have permission to do that");
                //res.send("You do not have permission to do that");
                res.redirect("back");
            }
     
        }
    });
} else {
    req.flash("error", "You need to be logged in to do that");
    //console.log("you need to be logged in");
    //res.send("you need to be logged in");
    res.redirect("back"); //take user back to where they came from
}
}    


middlewareObj.isLoggedIn = function(req, res, next) {
//Authentication
    if(req.isAuthenticated()) {
        return next();
    } else {
        req.flash("error", "You need to be logged in to do that"); //it doesn't render anything, put before redirect!!
        res.redirect("/login");
    }
}

module.exports = middlewareObj