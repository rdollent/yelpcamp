function average(arr) {
    var sum = arr.reduce(function(acc,val) {
        return acc + val;
    }, 0);
    
    return console.log(Math.round(sum / arr.length));
}

var scores = [90, 98, 89, 100, 100, 86, 94];
average(scores);

var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
average(scores2);