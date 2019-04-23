//require express to connect to app.js
var express = require("express");
var router = express.Router({mergeParams: true}); //mergeParams will fix req.params.id = null, will merge params from both campground and comment. we'll be able to access campgrounds/:id

//require missing vars
var Campground = require("../models/campground");
var Comment = require("../models/comment");
// "../" will move you up one dir
var middleware = require("../middleware/index.js")
// if we require only ""../middleware" it will automatically look for index.js


//=======================================

// New Route for Comments
router.get("/new", middleware.isLoggedIn, function(req, res) {
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
router.post("/", middleware.isLoggedIn, function(req, res) {
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
});

// Edit route
//need get request from /campgrounds/:id/comments/:comment_id
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    //campground._id is already inside req.params.id. see: app.js
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });

});

// Update Route
//need put request to /campgrounds/:id/comments/:comment_id
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if(err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// Delete Route
// /campgrounds/:id/comments/:comment_id
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if(err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})


//middleware


module.exports = router;
