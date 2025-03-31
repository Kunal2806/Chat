import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({port: 8080});
console.log("Server Start...");

interface MessageType {
    type: string;
    payload: {
        roomId: number;
        name?: string;
        text?: string;
    }
}

const userData = new Map<WebSocket, number[]>();

wss.on("connection",function(socket: WebSocket) {

    socket.on("message", (event: string)=> {
        const { type, payload: { roomId, name, text} }: MessageType = JSON.parse(event);
        let room: number[]= [];
        if(type == "join") {
            room = userData.get(socket) || [];
            userData.get(socket)?.includes(roomId)?
            socket.send("Room already Exists!"):
            userData.set(socket, [...room,roomId]);
            socket.send(JSON.stringify(userData.get(socket)));
        }

        else if(type == "chat" && typeof text=='string' && typeof name=='string') {
            userData.get(socket)?.includes(roomId) &&
            wss.clients.forEach((client: WebSocket)=> {
                if(userData.get(client)?.includes(roomId)) {
                    if(client == socket) {
                        socket.send(JSON.stringify({my: true, roomId: roomId, text: text}));
                    }
                    else{
                        client.send(JSON.stringify({name: name, roomId: roomId, text: text}));
                    }
                }
            })
        }

        else {
            socket.send("Wrong Credentials!")
        }

    })

    socket.on('close',(socket: WebSocket)=> {
        userData.delete(socket);
    })

})
