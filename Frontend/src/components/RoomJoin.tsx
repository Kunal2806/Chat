import { useNavigate } from "react-router-dom";
import { useState, useEffect} from "react";


interface roomOptProp {
    roomOpt : string;
    wsRef: WebSocket | null;
    setRoom: (Room :number []) => void;
    _setName :(Name: string) => void;
}


function RoomJoin({roomOpt,wsRef,setRoom, _setName}: roomOptProp) {
    const navigate = useNavigate();

    const [name, setName] = useState<string>("")
    const [roomId, setRoomId] = useState<number | null>(null)

    useEffect(() => {
        if(roomOpt != 'Join' && roomOpt != "Create") {
            navigate("/");
        }
    }, [roomOpt])

    
    const handleSubmit = () => {
        
        if(wsRef && name != null && roomId!=null) {
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
                if(e.data == "Room already Exists!") {
                    alert(e.data)
                }
                else {
                    const roomarray = JSON.parse(e.data)
                    _setName(name);
                    setRoom(roomarray);
                    navigate('/chat');
                }
                
              }
        }
    }

  return (
    <>
        <div className="flex flex-col items-center bg-[#3C496C] h-screen text-white">
            <div className="h-[56px] w-[100%] bg-[#465687] flex items-center md:h-[84px]">
                <p className="font-Rubik_Vinyl text-3xl md:text-5xl ml-8 md:ml-18">Chat ...</p>
            </div>
            <div className="flex md:flex-row flex-col w-[85%] h-[100%] items-center justify-between mt-10 md:mt-0">
                <div className="flex flex-col items-start md:mb-18 text-2xl md:text-5xl/14 mt-15">
                    <p className="font-Rubik_Vinyl mb-8 ">Temporary Room</p>
                    <p className="font-Russo_One ">Your data will be <br/> automatically removed <br/> whenever you disconnect.</p>
                </div>
            {
                <div className="flex flex-col justify-center items-center space-y-8 h-[90%] w-[33%] md:border border-white rounded-2xl text-2xl  md:text-[40px] font-Russo_One">
                <input type="text" placeholder="Enter Name" className="border rounded-2xl cursor-pointer hover:bg-[#E5EBF4] hover:text-[#3C496C] text-center w-[300px] h-[50px] md:w-[70%] md:h-[70px] " onChange={
                    (e)=>{setName(e.target.value);}
                }></input>
                
                <input type="text" placeholder="Room Code" className="border rounded-2xl cursor-pointer hover:bg-[#E5EBF4] hover:text-[#3C496C] text-center w-[300px] h-[50px] md:w-[70%] md:h-[70px] "  onChange={
                    (e)=>{
                        let value = e.target.value;
                        let numbervalue = Number(value);
                        setRoomId(numbervalue)
                    }
                }></input>
                <div className="border rounded-2xl md:pl-15 md:pr-15 md:pt-1 pl-7 pr-7 pt-2 pb-1 bg-[#E5EBF4] text-[#3C496C] cursor-pointer hover:bg-[#3C496C] hover:text-[#E5EBF4] " onClick={()=>{handleSubmit()}}>Create</div>
                </div>
            }
        </div>
        </div>
    </>
  )
}

export default RoomJoin