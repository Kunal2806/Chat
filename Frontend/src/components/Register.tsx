import { useNavigate } from "react-router-dom";

type registerPrompt = {
    setRoomOpt: (roomOpt : string) => void;
}

function Register({setRoomOpt}: registerPrompt) {
    const Navigate = useNavigate();

    const handleRoom = (roomOpt: string ) =>{
        setRoomOpt(roomOpt);
        Navigate("/roomjoin")
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
                <div className="flex flex-col justify-center items-center space-y-8 h-[90%] w-[33%] md:border border-white rounded-2xl text-2xl  md:text-[40px] font-Russo_One">
                    <div className="border rounded-2xl md:pl-15 md:pr-15 md:pt-1 pl-7 pr-7 pt-2 pb-1 cursor-pointer hover:bg-[#E5EBF4] hover:text-[#3C496C] " onClick={()=>{
                        handleRoom("Join")
                    }}>Join_Room</div>
                    <div className="border rounded-2xl md:pl-9 md:pr-9 md:pt-1  pl-6 pr-6 pt-2 pb-1 cursor-pointer hover:bg-[#E5EBF4] hover:text-[#3C496C] " onClick={()=>{
                        handleRoom("Create")
                    }}>Create_Room</div>
                </div>
            </div>
        </div>  
    </>
  )
}

export default Register