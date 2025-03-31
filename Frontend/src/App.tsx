import { useEffect, useRef, useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Loading from "./components/Loading"
import Register from "./components/Register";
import RoomJoin from "./components/RoomJoin";
import Chat from "./components/Chat";


function App() {
  
  const [loading, setLoading] = useState(true);
  const wsRef = useRef<WebSocket | null>(null);
  const [roomOpt, setRoomOpt] = useState<string>("");
  const [Room, setRoom] = useState<number []>([]);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    
    const ws = new WebSocket('ws://localhost:8080/')
    
    ws.onopen = () => {
      setLoading(false);
      wsRef.current = ws;
    }
    
    ws.onclose = () => {
      setLoading(true);
    }

    return () => {
      if(wsRef.current){
        wsRef.current.close();
      }
    }
  }, [])
  return (
    <div className="cursor-default">
      <BrowserRouter>
        <Routes>
          {
            loading?
            <Route path="/" element={<Loading/>} /> :
            <Route path="/" element={<Register setRoomOpt={setRoomOpt}/>} /> 
          }
          <Route path="/roomjoin" element={<RoomJoin roomOpt={roomOpt} wsRef={wsRef.current} setRoom={setRoom} _setName={setName}/>} />
          <Route path="/chat" element={<Chat Room={Room} _name={name} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App