var canvas = document.getElementById("404canvas"),
    ctx = canvas.getContext("2d"),
    FPS = 30;
    
canvas.width = 1000;
canvas.height = 700;

var space = canvas.getBoundingClientRect();

var offset = {
    x: space.top,
    y: space.left
}

function draw(){

}

window.onmousedown = function( e ){
    e = e || window.event;
    var cord = {
        x: e.pageX - offset.x,
        y: e.pageY - offset.y
    }
    ctx.font = "20pt inherit";
    ctx.fillStyle = "#252525";
    ctx.fillText("404!" cord.x, cord.y);
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
