var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "//c1.staticflickr.com/3/2485/3924264504_d75177e16f_b.jpg",
        description: "qwerty"
    },
    {
        name: "Desert Mesa",
        image: "//c1.staticflickr.com/3/2311/2123340163_af7cba3be7_b.jpg",
        description: "asdfgh"
    },
    {
        name: "Canyon Floor",
        image: "//c1.staticflickr.com/3/2849/11952665455_43536b0abe_b.jpg",
        description: "zxcvbnm"
    },
]

function seedDB() {
    //Remove all campgrounds
    Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        }
        console.log("removed campgrounds");
    });
    
    //add a few campgrounds
    data.forEach(function(seed) {
        Campground.create(seed, function(err, campground) {
            if(err) {
                console.log(err);
            } else {
                console.log("added a campground");
                //create a comment
                Comment.create(
                    {
                        text: "This place is great",
                        author: "Homer"
                    }, function(err,comment) {
                        if(err) {
                            console.log(err);
                        } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new comment");
                        }
                    });
            }
        });
    });

}

module.exports = seedDB;