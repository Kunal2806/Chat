import { useEffect, useRef, useState } from "react"


import Loading from "./components/Loading"
import Register from "./components/Register";
import RoomJoin from "./components/RoomJoin";


function App() {
  
  const [loading, setLoading] = useState(true);
  const wsRef = useRef<WebSocket | null>(null);
  const [roomOpt, setRoomOpt] = useState<string>("");
  
  useEffect(() => {
    
    const ws = new WebSocket('ws://localhost:8080/')
    ws.onopen = () => {
      setLoading(false);
    }
    wsRef.current = ws;
      
    
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
      {
        roomOpt == "" ? 
        loading ? <Loading />:<Register setRoomOpt={setRoomOpt}/> :
        <RoomJoin roomOpt={roomOpt}/>
      }
    </div>
  )
}

export default App
