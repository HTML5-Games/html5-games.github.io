var canvas = document.getElementById("404canvas"),
    ctx = canvas.getContext("2d"),
    FPS = 30;
    
canvas.width = 880;
canvas.height = 600;


function draw(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function update(){
    
}

function tick(){
    draw();
    update();
}

setInterval(tick,1000/FPS)
