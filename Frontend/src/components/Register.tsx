
type registerPrompt = {
    setRoomOpt: (roomOpt : string) => void;
}

function Register({setRoomOpt}: registerPrompt) {
    
    const handleRoom = (roomOpt: string ) =>{
        setRoomOpt(roomOpt);
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
                <div className="flex flex-col justify-center items-center space-y-8 h-[90%] w-[33%] border border-white rounded-2xl text-[40px] font-Russo_One">
                    <div className="border rounded-2xl pl-15 pr-15 pt-1 cursor-pointer hover:bg-[#E5EBF4] hover:text-[#3C496C] " onClick={()=>{
                        handleRoom("Join")
                    }}>Join Room</div>
                    <div className="border rounded-2xl pl-9 pr-9 pt-1 cursor-pointer hover:bg-[#E5EBF4] hover:text-[#3C496C] " onClick={()=>{
                        handleRoom("Create")
                    }}>Create Room</div>
                </div>
            </div>
        </div>  
    </>
  )
}

export default Register