import {useNavigate } from "react-router-dom";
import { useState } from "react";

interface RoomProp {  
    Room: number[];
    _name: string;
    wsRef: WebSocket | null;
}

interface MessageProp {
  my?: boolean;
  name?: string;
  roomId: number;
  text: string;
}

function Chat({Room , _name , wsRef}: RoomProp) {

  const navigate = useNavigate();
  const [RoomId, setRoomId] = useState<number | null>(null);
  const [message, setmessage] = useState<MessageProp []>([]);
  const [sendMessage, setsendMessage] = useState<string>("");
  const [toggle, settoggle] = useState(true);

  const handleAddClick = () => {
    navigate('/roomjoin')
  }

  if(wsRef != null) {
    wsRef.onmessage = (e) => {  
      const data = JSON.parse(e.data);
      setmessage((pre)=>[...pre,data]);
    }
  }
  
  const handleSendButton = () => {
    wsRef?.send(JSON.stringify({
      type:"chat",
      payload: {
        roomId: RoomId,
        name: _name,
        text: sendMessage
      }
    }))
    setsendMessage("");
  }

  return (
    <>
      <div className="w-screen h-screen bg-[rgb(229,235,244)] flex justify-center items-center">
        <div className="w-[95vw] h-[92vh]">

          <div className="w-[100%] h-[50px] flex">
            <div className="w-[300px] md:w-[600px] bg-[#465687] flex justify-between items-center">
              <p className="text-white text-2xl font-Russo_One ml-4">{_name}</p>
              <div className="rounded-full border-2 bg-white mr-4 " onClick={()=>{handleAddClick()}}>
                <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#75FB4C"><path d="M446.67-446.67H200v-66.66h246.67V-760h66.66v246.67H760v66.66H513.33V-200h-66.66v-246.67Z"/></svg>
              </div>
            </div>
            <div className="w-full bg-[#F3F7FB] flex items-center justify-end border-1">
              <p className="text-black text-[24px] mr-10">{RoomId}</p>
            </div>
          </div>
          
          <div className="w-[100%] h-[577px] flex ">

            {
              toggle ?
              <div className="w-[600px] h-[100%] bg-white flex flex-col items-center overflow-y-scroll " >
                <div className="flex w-[100%] justify-end items-end" onClick={()=>settoggle(false)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#465687"><path d="M440-280v-400L240-480l200 200Zm80 160h80v-720h-80v720Z"/></svg></div>
              {
                Room.map((room,index)=>{
                  return(
                    <div key={index} className="w-[100%] h-[94px] border-b-1 border-dashed border-[#3C496C] flex items-end " onClick={
                      ()=> {
                        setRoomId(room)
                      }
                    }>
                      <p className="text-[24px] mb-2 ml-3">{room}</p>
                    </div>
                  )
                })
              }
            </div> :
            <div onClick={()=>settoggle(true)}> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#465687"><path d="M360-120v-720h80v720h-80Zm160-160v-400l200 200-200 200Z"/></svg> </div>
            }
            <div className="w-full">
              <div className="w-full h-[526px] overflow-y-scroll">
               
               {
                message.map((e,index)=>{
                  return (
                    e.my ?
                    RoomId == e.roomId &&
                    <div key={index} className="flex justify-end">
                    <div className="flex flex-col w-fit min-w-[103px] text-[24px] mr-5 mt-10 pr-5 p-4 pl-5 rounded-br-3xl rounded-bl-3xl rounded-tl-3xl bg-[#B0C8E0]">
                    <div>{e.text}</div>
                    </div>
                    </div>  :
                    RoomId == e.roomId &&
                    <div key={index}>
                    <div className="bg-white flex flex-col w-fit min-w-[103px] text-[24px] ml-18 mt-10 pr-5 p-2 pl-5 rounded-br-3xl rounded-bl-3xl rounded-tr-3xl">
                      <div className="text-[#FFAC59]">{e.name}</div>
                      <div>{e.text}</div>
                    </div>
                    </div>
                  )
                })
               }

              </div>

              

              <div className="bg-white w-full h-[50px] border-1 border-[#B0C8E0] flex justify-between items-center rounded-[10px]">
                <input type="text" placeholder="Send a Message" className="w-full border-none outline-none ml-8 h-full" value={sendMessage} onChange={(e)=>{
                  setsendMessage(e.target.value)
                }}/>

                <div className="mr-5 border-1 h-[30px] w-[72px] bg-[#3C496C] rounded-[10px] text-white flex justify-center pt-[1px] " onClick={()=>{
                  handleSendButton()
                }}>Send</div>  
              </div>
            </div>
          </div>

        </div>  
      </div>
    </>
  )
}

export default Chat