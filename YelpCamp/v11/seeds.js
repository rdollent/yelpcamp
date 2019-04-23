var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "//c1.staticflickr.com/3/2485/3924264504_d75177e16f_b.jpg",
        description: "Bacon ipsum dolor amet pastrami cupim tongue, flank pig picanha bresaola burgdoggen rump tail pork chop tri-tip turducken ball tip. Capicola shankle prosciutto, pig porchetta salami bacon. Drumstick pastrami jerky pork pig burgdoggen sirloin kielbasa alcatra filet mignon tongue fatback doner landjaeger pancetta. Pork ribeye boudin chicken sausage bacon. Spare ribs pig venison hamburger pork chop, sausage short loin. Ground round tongue andouille biltong shankle, swine jowl boudin alcatra short loin pancetta spare ribs."
    },
    {
        name: "Desert Mesa",
        image: "//c1.staticflickr.com/3/2311/2123340163_af7cba3be7_b.jpg",
        description: "Bacon ipsum dolor amet pastrami cupim tongue, flank pig picanha bresaola burgdoggen rump tail pork chop tri-tip turducken ball tip. Capicola shankle prosciutto, pig porchetta salami bacon. Drumstick pastrami jerky pork pig burgdoggen sirloin kielbasa alcatra filet mignon tongue fatback doner landjaeger pancetta. Pork ribeye boudin chicken sausage bacon. Spare ribs pig venison hamburger pork chop, sausage short loin. Ground round tongue andouille biltong shankle, swine jowl boudin alcatra short loin pancetta spare ribs."
    },
    {
        name: "Canyon Floor",
        image: "//c1.staticflickr.com/3/2849/11952665455_43536b0abe_b.jpg",
        description: "Bacon ipsum dolor amet pastrami cupim tongue, flank pig picanha bresaola burgdoggen rump tail pork chop tri-tip turducken ball tip. Capicola shankle prosciutto, pig porchetta salami bacon. Drumstick pastrami jerky pork pig burgdoggen sirloin kielbasa alcatra filet mignon tongue fatback doner landjaeger pancetta. Pork ribeye boudin chicken sausage bacon. Spare ribs pig venison hamburger pork chop, sausage short loin. Ground round tongue andouille biltong shankle, swine jowl boudin alcatra short loin pancetta spare ribs."
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