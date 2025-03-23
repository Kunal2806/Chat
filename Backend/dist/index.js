"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
console.log("server started...");
const userData = new Map();
wss.on("connection", (socket) => {
    socket.on("message", function (message) {
        var _a, _b;
        const parsedMessage = JSON.parse(message);
        if (parsedMessage.type == "join" && typeof parsedMessage.payload.text == 'number') {
            if (userData.get(parsedMessage.payload.name)) {
                ((_a = userData.get(parsedMessage.payload.name)) === null || _a === void 0 ? void 0 : _a.find(u => u == parsedMessage.payload.text)) ?
                    socket.send("room already exist") :
                    (_b = userData.get(parsedMessage.payload.name)) === null || _b === void 0 ? void 0 : _b.push(parsedMessage.payload.text);
            }
            else {
                userData.set(parsedMessage.payload.name, [parsedMessage.payload.text]);
            }
            socket.send(JSON.stringify(userData.get(parsedMessage.payload.name)));
        }
        else if (parsedMessage.type == "chat") {
            socket.send(`Mr. ${parsedMessage.payload.name} your message is ${parsedMessage.payload.text}`);
        }
        else {
            socket.send("Credentials are not valid");
        }
    });
});
