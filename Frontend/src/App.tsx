import { useEffect, useRef, useState } from "react"

import Loading from "./components/Loading"
import Register from "./components/Register";


function App() {
  
  const [loading, setLoading] = useState(true);
  const wsRef = useRef<WebSocket | null>(null);
  
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
    <>
      {
        loading ? <Loading />:<Register />
      }
    </>
  )
}

export default App
