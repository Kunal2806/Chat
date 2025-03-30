import { useNavigate } from "react-router-dom";
import { useState, useEffect} from "react";


interface roomOptProp {
    roomOpt : string;
    wsRef: WebSocket | null;
}


function RoomJoin({roomOpt,wsRef}: roomOptProp) {
    const navigate = useNavigate();

    const [name, setName] = useState<string | null>(null)
    const [roomId, setRoomId] = useState<number | null>(null)

    useEffect(() => {
        if(roomOpt != 'Join' && roomOpt != "Create") {
            navigate("/");
        }
    }, [roomOpt])

    
    const handleSubmit = () => {
        
        if(wsRef && name != null && roomId!=null) {
            console.log(name + roomId);
            wsRef.send(
                JSON.stringify({
                    type: "join",
                    payload: {
                        roomId: roomId,
                        name: name
                    }
                })
            )
            wsRef.onmessage = (e) => {
                console.log(JSON.parse(e.data));
            }
        }
    }

  return (
    <>
        <div className="flex flex-col items-center bg-[#3C496C] h-[100vh] text-white">
        <div className="h-[84px] w-[100%] bg-[#465687] flex items-center">
            <p className="font-Rubik_Vinyl text-5xl ml-18">Chat ...</p>
        </div>
        <div className="flex w-[85%] h-[100%] items-center justify-between">
            <div className="flex flex-col items-start mb-18 text-5xl/14">
                <p className="font-Rubik_Vinyl mb-8 ">Temporary Room</p>
                <p className="font-Russo_One ">Your data will be <br/> automatically removed <br/> whenever you disconnect.</p>
            </div>
            {
                roomOpt == "Join" ?
                <div className="flex flex-col justify-center items-center space-y-8 h-[90%] w-[33%] border border-white rounded-2xl text-[40px] font-Russo_One">
                <input type="text" placeholder="Enter Name" className="border rounded-2xl cursor-pointer hover:bg-[#E5EBF4] hover:text-[#3C496C] text-center w-[70%]" onChange={
                    (e)=>{setName(e.target.value); console.log(e.target.value)}
                }></input>
                
                <input type="text" placeholder="Room Code" className="border rounded-2xl cursor-pointer hover:bg-[#E5EBF4] hover:text-[#3C496C] text-center w-[70%]"  onChange={
                    (e)=>{
                        let value = e.target.value;
                        let numbervalue = Number(value);
                        console.log(numbervalue)
                        setRoomId(numbervalue)
                    }
                }></input>
                <div className="border rounded-2xl mt-15 pl-9 pr-9 pt-1 bg-[#E5EBF4] text-[#3C496C] cursor-pointer hover:bg-[#3C496C] hover:text-[#E5EBF4] " onClick={()=>{handleSubmit()}}>Create</div>
            </div> :
            <div className="flex flex-col justify-center items-center space-y-8 h-[90%] w-[33%] border border-white rounded-2xl text-[40px] font-Russo_One">
            <input type="text" placeholder="Enter Name" className="border rounded-2xl cursor-pointer hover:bg-[#E5EBF4] hover:text-[#3C496C] text-center w-[70%]" onChange={
                (e)=>{setName(e.target.value); console.log(e.target.value)}
            }></input>
            
            <input type="text" value={roomId?roomId:"Generate"} className="border rounded-2xl cursor-pointer hover:bg-[#E5EBF4] hover:text-[#3C496C] text-center w-[70%]"  onClick={
                ()=>{
                    let numbervalue = Math.floor(Math.random()*1000000)
                    console.log(numbervalue)
                    setRoomId(numbervalue)
                }
            }></input>
            <div className="border rounded-2xl mt-15 pl-9 pr-9 pt-1 bg-[#E5EBF4] text-[#3C496C] cursor-pointer hover:bg-[#3C496C] hover:text-[#E5EBF4] " onClick={()=>{handleSubmit()}}>Create</div>
            </div>
            }
        </div>
        </div>
    </>
  )
}

export default RoomJoin