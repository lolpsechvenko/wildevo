const socket = io();

const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = {
    x: 200,
    y: 200,
    speed: 4
};

let keys = {};
let players = {};

window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);

// move player
function update(){

    if(keys["w"]) player.y -= player.speed;
    if(keys["s"]) player.y += player.speed;
    if(keys["a"]) player.x -= player.speed;
    if(keys["d"]) player.x += player.speed;

    socket.emit("move", player);
}

// draw
function draw(){

    ctx.fillStyle = "#111";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    // other players
    for(let id in players){
        ctx.fillStyle = "red";
        ctx.fillRect(players[id].x, players[id].y, 20, 20);
    }

    // you
    ctx.fillStyle = "#00ff66";
    ctx.fillRect(player.x, player.y, 20, 20);
}

function loop(){
    update();
    draw();
    requestAnimationFrame(loop);
}
loop();

// receive players
socket.on("players", (data) => {
    players = data;
});
