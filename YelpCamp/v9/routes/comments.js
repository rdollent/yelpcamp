//require express to connect to app.js
var express = require("express");
var router = express.Router({mergeParams: true}); //mergeParams will fix req.params.id = null, will merge params from both campground and comment. we'll be able to access campgrounds/:id

//require missing vars
var Campground = require("../models/campground");
var Comment = require("../models/comment");


//=======================================

// New Route for Comments
router.get("/new", isLoggedIn, function(req, res) {
    //res.send("This will be the comment form");
    //find campground by id
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
    //res.render("comments/new") //make a dir inside views called comments
});

//comments create
router.post("/", isLoggedIn, function(req, res) {
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            //req.body.comment because of comment[text] & comment[body]
            //no need for var t = req.body.text
            Comment.create(req.body.comment, function(err, comment) {
                if(err) {
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id; //commentSchema
                    comment.author.username = req.user.username;
                    console.log(req.user.username) //there will always be a user because of isLoggedIn middleware
                    //save comment
                    console.log(comment);
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
    //create new comment
    //connect new comment to capground
    //redirect to campground showpage
})

//middleware
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/login");
    }
}
module.exports = router
