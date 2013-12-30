var link = location.href;
var seconds = 30;

var sec = " seconds";

var tick = function(){
    seconds = seconds - 1;
    if (seconds > 1){
        sec = " seconds";
    }
    else if( seconds < 0){
        sec = " seconds";
        window.location.assign("http://html5-games.github.io/");
    }
    else {
        sec = " second";
    }
    document.getElementById("x").innerHTML = "Oh no, It seems that the page - " + link + " - does not exist.";
    document.getElementById("y").innerHTML = "You will be directed back to the home page in " + seconds + sec;
}

setInterval(tick,1000);
