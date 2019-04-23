var express = require("express");
var app = express();
var request = require("request");

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Movie app has started!!!");
});

app.set("view engine", "ejs");

app.get("/", function(req,res) {
    res.render("search");
})

app.get("/results", function(req,res) {
    var query = req.query.search;
    request("http://www.omdbapi.com/?s=" + query + "&apikey=thewdb", function(error, response, body) {
        if(!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            // res.send(data["Search"][0]["Title"]);
            res.render("results", {data: data});
        }
    })
})