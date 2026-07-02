const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let players = {};

io.on("connection", (socket) => {
    console.log("Player connected:", socket.id);

    // spawn player
    players[socket.id] = {
        x: 400,
        y: 300
    };

    io.emit("players", players);

    socket.on("move", (data) => {
        if(players[socket.id]){
            players[socket.id].x = data.x;
            players[socket.id].y = data.y;
        }
        io.emit("players", players);
    });

    socket.on("disconnect", () => {
        delete players[socket.id];
        io.emit("players", players);
    });
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
