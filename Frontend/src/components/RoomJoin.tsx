
interface roomOptProp {
    roomOpt : string;
}

function RoomJoin({roomOpt}: roomOptProp ) {
  return (
    <div>
        {roomOpt}
    </div>
  )
}

export default RoomJoin