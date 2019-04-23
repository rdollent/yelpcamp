var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground.js");
var seedDB = require("./seeds.js");
var Comment = require("./models/comment.js");

seedDB();

mongoose.connect("mongodb://localhost/yelp_camp_v3"); //will create yelp_camp database
app.use(bodyParser.urlencoded({extended: true}));


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")) //dirname is where the script is ran from console.log(__dirname)

// //Schema setup
// var campgroundSchema = new mongoose.Schema({
//     name: String,
//     image: String,
//     description: String
// });

// var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Granite Hill",
//         image: "//c1.staticflickr.com/3/2485/3924264504_d75177e16f_b.jpg",
//         description: "This is a huge granite hill"
//     }, function(err, campground) {
//         if(err) {
//             console.log(err);
//         } else {
//             console.log("Newly-created Campground: ");
//             console.log(campground);
//         }
//     });





// var campgrounds = [
//     {name: "Salmon Creek", image: "//c1.staticflickr.com/3/2849/11952665455_43536b0abe_b.jpg"},
//     {name: "Granite Hill", image: "//c1.staticflickr.com/3/2485/3924264504_d75177e16f_b.jpg"},
//     {name: "Mountain Goat's Rest", image: "//c1.staticflickr.com/3/2311/2123340163_af7cba3be7_b.jpg"},
//     {name: "Salmon Creek", image: "//c1.staticflickr.com/3/2849/11952665455_43536b0abe_b.jpg"},
//     {name: "Granite Hill", image: "//c1.staticflickr.com/3/2485/3924264504_d75177e16f_b.jpg"},
//     {name: "Mountain Goat's Rest", image: "//c1.staticflickr.com/3/2311/2123340163_af7cba3be7_b.jpg"},
//     {name: "Salmon Creek", image: "//c1.staticflickr.com/3/2849/11952665455_43536b0abe_b.jpg"},
//     {name: "Granite Hill", image: "//c1.staticflickr.com/3/2485/3924264504_d75177e16f_b.jpg"},
//     {name: "Mountain Goat's Rest", image: "//c1.staticflickr.com/3/2311/2123340163_af7cba3be7_b.jpg"}
//     ];

//Routes
app.get("/", function(req,res) {
    res.render("landing");
});

//INDEX ROUTE - show all campgrounds
app.get("/campgrounds", function(req,res) {
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
    // res.render("campgrounds", {campgrounds: campgrounds});
});


//CREATE ROUTE - add new campgrounds to db
app.post("/campgrounds", function(req,res) {
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
app.get("/campgrounds/new", function(req,res) {
    res.render("ampgrounds/new.ejs");
})

//SHOW ROUTE - shows more info about one campground
app.get("/campgrounds/:id", function(req, res) {
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

//=======================================

// New Route for Comments
app.get("/campgrounds/:id/comments/new", function(req, res) {
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

app.post("/campgrounds/:id/comments", function(req, res) {
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
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
    //create new comment
    //connect new comment to capground
    //redirect to campground showpage
})










app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp server has started");
});



// RESTFUL ROUTES

// name    url          verb       desc
// =============================================
// INDEX   /dogs        GET       Display a lot of all dogs
// NEW     /dogs/new    GET       Displays a form  to make a new dog
// CREATE  /dogs        POST      Add new dog to DB
// SHOW    /dogs/:id    GET       Shows info about one dog