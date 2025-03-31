
interface RoomProp {
    Room: string[];
}

function Chat({Room}: RoomProp) {
  return (
    <>
      <div className="w-screen h-screen bg-[rgb(229,235,244)] flex justify-center items-center">
        <div className="w-[95vw] h-[92vh]">

          <div className="w-[100%] h-[50px] flex">
            <div className="w-[600px] bg-[#465687] flex justify-between items-center">
              <p className="text-white text-2xl font-Russo_One ml-4">Name</p>
              <div className="rounded-full border-2 bg-white mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#75FB4C"><path d="M446.67-446.67H200v-66.66h246.67V-760h66.66v246.67H760v66.66H513.33V-200h-66.66v-246.67Z"/></svg>
              </div>
            </div>
            <div className="w-full bg-[#F3F7FB] flex items-center justify-end border-1">
              <p className="text-black text-[24px] mr-10">Name</p>
            </div>
          </div>
          
          <div className="w-[100%] h-[577px] bg-white">

          </div>

        </div>  
      </div>
    </>
  )
}

export default Chat