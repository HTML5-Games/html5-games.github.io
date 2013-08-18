var canvas = document.getElementById("404canvas"),
    ctx = canvas.getContext("2d"),
    FPS = 30;
    
canvas.width = 880;
canvas.height = 600;


function pxlBlk(x, y){
    ctx.fillStyle = "white";
    ctx.fillRect(x,y, 10,10);
}


var player = {
    x: 440,
    y: 500,
    vx: 0,
    draw: function(){
        pxlBlk(this.x + 10,this.y);
        pxlBlk(this.x + 30,this.y);
        pxlBlk(this.x,this.y + 10);
        pxlBlk(this.x + 10,this.y + 10);
        pxlBlk(this.x + 20,this.y + 10);
        pxlBlk(this.x + 30,this.y + 10);
        pxlBlk(this.x + 40,this.y + 10);
    },
    update: function(){
        this.x += this.vx / FPS;
    }
}


function draw(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    player.draw();
}

window.onkeydown = function( e ){
    e = e || window.event;
    
    code = e.keycode || e.which;
    
    if(code == 37){
        player.vx = -100;
    }
    if(code == 39){
        player.vx = 100;
    }
}

window.onkeyup = function( e ){
    e = e || window.event;
    
    code = e.keycode || e.which;
    
    if(code == 37){
        player.vx = 0;
    }
    if(code == 39){
        player.vx = 0;
    }
}

function update(){
    
}

function tick(){
    draw();
    update();
}

setInterval(tick,1000/FPS)
