var link = location.href;
var seconds = 30;

var tick = function(){
    seconds = seconds - 1;
    document.getElementById("x").innerHTML = "Oh no, It seams that the page(" + link + ") you are looking for does not exist.";
    document.getElementById("y").innerHTML = "You will be directed back to the home page in " + seconds + " seconds.";
}

setInterval(tick,1000);
