import io from "socket.io-client";
class SocketManager {
   constructor(){
     this.socket = io.connect("http://localhost:4000")
   }

   joinRoom = (room) =>{
     this.socket.emit("join-room",room)
   }
}

const socket = new SocketManager()

export default socket