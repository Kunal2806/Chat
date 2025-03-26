import { useEffect, useRef, useState } from "react"

function Loading() {

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
          loading && 
          <div className=" h-screen flex justify-center items-center relative ">
          <div>
            <img src="./images/Logo.svg" alt="Chat"/>
          </div>
        </div>
        }
        
      </>
    )
  }
  
  export default Loading