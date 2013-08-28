var canvas = document.getElementById("404canvas"),
    ctx = canvas.getContext("2d"),
    FPS = 30;
    
canvas.width = 1000;
canvas.height = 700;

function draw(){

}

window.onkeydown = function( e ){
    e = e || window.event;
    
    code = e.keycode || e.which;
    
}

window.onkeyup = function( e ){
    e = e || window.event;
    
    code = e.keycode || e.which;
    
}

function update(){
}

function tick(){
    draw();
    update();
}

setInterval(tick,1000/FPS)
