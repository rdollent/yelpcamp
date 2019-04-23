var express= require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");


//set up mongoose
mongoose.connect("mongodb://localhost/restful_blog_app"); //creates the first time it is run
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method")); //can be passed anything, not exclusively _method.
app.use(expressSanitizer()); //must e after bodyParser

///////////////////////
// mongoose schema
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now} //created date is date now
});

// compile into model
var Blog = mongoose.model("Blog", blogSchema);
/////////////////////

//use for initial data store in mongodb
//run mongo (type mongo in terminal)
//show dbs
//use (db name)
//show collection
//db."db name".find() to show all stored data
// Blog.create({
//     title: "Test Blog",
//     image: "https://upload.wikimedia.org/wikipedia/commons/d/d6/GermanShep1_wb.jpg",
//     body: "Test blog post!"
// })

// RESTful Routes

//root route
app.get("/", function(req,res) {
   res.redirect("/blogs");
});

//Index Route
app.get("/blogs", function(req, res) {
    //res.render("index");  //mkdir views/index.ejs
    //retrieve all blogs from the database
   Blog.find({}, function(err, blogs) {
       if(err) {
           console.log(err);
       } else {
           res.render("index", {blogs: blogs});
       }
   });
});


//New Route
app.get("/blogs/new", function(req,res) {
    res.render("new");
});

//Create Route
app.post("/blogs", function(req,res) {
    //create blog
    console.log(req.body);
    req.body.blog.body = req.sanitize(req.body.blog.body);  //blog.body is blog[body] in form
    console.log("=========");
    console.log(req.body);
    Blog.create(req.body.blog, function(err, newBlog) {
        if(err) {
            res.render("new");
        } else {
            //then, redirect to the index
            res.redirect("/blogs");
        }
    });
});

//Show Route
app.get("/blogs/:id", function(req,res) {
    //res.send("Show Page"); //to start
    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog}); //touch views/show.ejs
        }
    });
});


//Edit route
app.get("/blogs/:id/edit", function(req,res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err) {
            res.render("/blogs");
        } else {
            res.render("edit", {blog: foundBlog});
        }
    });
    //res.render("edit");
});

//Update Route
app.put("/blogs/:id", function(req,res) {
    req.body.blog.body = req.sanitize(req.body.blog.body);  //blog.body is blog[body] in form
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

//Delete Route
app.delete("/blogs/:id", function(req,res) {
    //res.send("DESTROY ROUTE!");
    //destroy blog
    Blog.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});

//create header/footer ejs
//mkdir views/partials
//touch views/partials/header.ejs






//listen
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is running");
});