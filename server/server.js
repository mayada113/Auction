const express = require(`express`)
const app = express()
const port = 4000
const api = require("./server/routes/api")
const itemApi = require(`./server/routes/itemAPI`)
const UserAPI = require(`./server/routes/UserAPI`)
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const mongoose = require(`mongoose`)
const cookieParser = require("cookie-parser")
const verifyJWT = require("./server/middleware/verifyJWT")
mongoose.connect(`mongodb://localhost/Auction`, { useNewUrlParser: true });

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With, x-access-token"
  );
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});


app.use((req, res, next) => {
  req.io = io;
  return next();
});

app.use(`/`, api);
//app.use(verifyJWT)
app.use(`/`, itemApi);
app.use(`/`, UserAPI);


io.on("connection", (socket) =>{
    console.log("user is now in"+socket.id);
    socket.on("join-room", room =>{
      console.log(room);
      socket.join(room)
      console.log(socket.rooms);
    })


    socket.on("leave-room", room =>{
      socket.leave(room)
      console.log("Bye~");
    })
    
    socket.on("disconnect", ()=>{
       console.log("user disconnected" + socket.id);
       socket.disconnect()
  
    })
})



//console.log(mongoose.Types.ObjectId.isValid("62c44e087a97xb6a62d43cf4"))

server.listen(port , function () {
    console.log(`Server running on port ${port}`)
})