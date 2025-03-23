import { WebSocketServer } from "ws";
const wss = new WebSocketServer({port: 8080});
console.log("server started...")

type Payload = {
    name: string; 
    text: string | number;
}

interface Message {
    type: string;
    payload: Payload
}

wss.on("connection", (socket) => {

    socket.send("login");
    
    socket.on("message",function(message: Message){

    const parsedMessage = JSON.parse(message as unknown as string);
        
        if(parsedMessage.type == "join") {
            socket.send(`Mr. ${parsedMessage.payload.name} you can join room: ${parsedMessage.payload.text} ...`);
        }

        else if(parsedMessage.type == "chat") {
           socket.send(`Mr. ${parsedMessage.payload.name} your message is ${parsedMessage.payload.text}`)
        }

    })
})