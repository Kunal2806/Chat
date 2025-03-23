"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
console.log("server started...");
wss.on("connection", (socket) => {
    socket.send("login");
    socket.on("message", function (message) {
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type == "join") {
            socket.send(`Mr. ${parsedMessage.payload.name} you can join room: ${parsedMessage.payload.text} ...`);
        }
        else if (parsedMessage.type == "chat") {
            socket.send(`Mr. ${parsedMessage.payload.name} your message is ${parsedMessage.payload.text}`);
        }
    });
});
