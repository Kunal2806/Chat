"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
console.log("Server Start...");
const userData = new Map();
wss.on("connection", function (socket) {
    socket.on("message", (event) => {
        var _a, _b;
        const { type, payload: { roomId, name, text } } = JSON.parse(event);
        let room = [];
        if (type == "join") {
            ((_a = userData.get(socket)) === null || _a === void 0 ? void 0 : _a.includes(roomId)) ?
                socket.send("Room already Exists!") :
                room = userData.get(socket) || [];
            userData.set(socket, [...room, roomId]);
            socket.send(JSON.stringify(userData.get(socket)));
        }
        else if (type == "chat" && typeof text == 'string' && typeof name == 'string') {
            ((_b = userData.get(socket)) === null || _b === void 0 ? void 0 : _b.includes(roomId)) &&
                wss.clients.forEach((client) => {
                    var _a;
                    if ((_a = userData.get(client)) === null || _a === void 0 ? void 0 : _a.includes(roomId)) {
                        client.send(JSON.stringify({ name: name, text: text }));
                    }
                });
        }
        else {
            socket.send("Wrong Credentials!");
        }
    });
    socket.on('close', (socket) => {
        userData.delete(socket);
    });
});
