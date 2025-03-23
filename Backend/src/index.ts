import { WebSocketServer, WebSocket } from "ws";
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

const userData = new Map<string, number[]>();

wss.on("connection", (socket: WebSocket) => {

    socket.on("message",function(message: string){
       
        const parsedMessage: Message= JSON.parse(message);

        if(parsedMessage.type == "join" && typeof parsedMessage.payload.text == 'number') {

            if(userData.get(parsedMessage.payload.name)) {

                userData.get(parsedMessage.payload.name)?.find(u=>u==parsedMessage.payload.text)?
                socket.send("room already exist") :
                userData.get(parsedMessage.payload.name)?.push(parsedMessage.payload.text);
                socket.send(JSON.stringify(userData.get(parsedMessage.payload.name)));
            }
            else{
                userData.set(parsedMessage.payload.name, [parsedMessage.payload.text]);
                socket.send(JSON.stringify(userData.get(parsedMessage.payload.name)));
            } 
        }

        else if(parsedMessage.type == "chat") {
            socket.send(`Mr. ${parsedMessage.payload.name} your message is ${parsedMessage.payload.text}`)
        }
        
        else {
            socket.send("Credentials are not valid")
        }
    })

    socket.on('close',(message: string)=>{
        const parsedMessage: Message = JSON.parse(message);
        userData.delete(parsedMessage.payload.name);
    })
    
})