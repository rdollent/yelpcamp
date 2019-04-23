var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground.js");
var seedDB = require("./seeds.js");
var Comment = require("./models/comment.js");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var methodOverride = require("method-override");
var flash = require("connect-flash");

//require route js files
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");


//seed the database, run every new copy of app.js
// seedDB();

mongoose.connect("mongodb://localhost/yelp_camp_v12"); //will create yelp_camp database
app.use(bodyParser.urlencoded({extended: true}));


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); //dirname is where the script is ran from console.log(__dirname)

app.use(methodOverride("_method")); //can use whatever name (docs use _method)

app.use(flash()); //use connect-flash for flash messages, need to come BEFORE Passport configuration

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



//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// to include currentUser variable into every route/template
// middleware
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


//app.use to use route js files
//reduce duplication in route js files by naming directory in app.use
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);



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