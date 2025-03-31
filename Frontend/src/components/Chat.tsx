


interface RoomProp {
    Room: string[];
}


function Chat({Room}: RoomProp) {
  return (
    <div>{Room}</div>
  )
}

export default Chat