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
        
    }
}


function draw(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    player.draw();
}

function update(){
    
}

function tick(){
    draw();
    update();
}

setInterval(tick,1000/FPS)
