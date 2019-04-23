var express = require("express");
var app = express();

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/auth_demo_app");

var passport = require("passport");
var bodyParser = require("body-parser");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var User = require("./models/user");


app.set("view engine", "ejs");

//using form data
app.use(bodyParser.urlencoded({extended: true}));

//require and use express session
app.use(require("express-session")( {
    secret: "Rusty is the beest and cutest dog",
    resave: false,
    saveUninitialized: false
}));

//set passport up
app.use(passport.initialize());
app.use(passport.session());

//needed for encoding and decoding data for sessions
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//=================
//ROUTES
//========================

//Index
app.get("/", function(req,res) {
    res.render("home");
});

//secret route
app.get("/secret", isLoggedIn, function(req,res) {
    res.render("secret");
});

//show sign up form
app.get("/register", function(req,res) {
    res.render("register");
});

//handling user signup
app.post("/register", function(req,res) {
    //res.send("Register post route"); //test
    //use bodyParser for req.body.username, req.body.password
    User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
        if(err) {
            console.log(err);
            res.render("register");
        } else {
            passport.authenticate("local")(req, res, function() {
                res.redirect("/secret");
            });
        }
    });
    
});

// login routes
//render login form
app.get("/login", function(req, res) {
    res.render("login");
});
//login logic
//middleware - code that runs before final route callback
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}),function(req, res) {
    
});

//logout
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server started....");
});

