const express = require('express'); // 라이브러리를 가져와 변수에 담아줌
const http = require("http");
const app = express();
const path = require("path");
const server = http.createServer(app); //express가 http를 통해서 실행될 수 있도록 지정
const moment = require("moment");
const socketIO = require("socket.io");

const io = socketIO(server);

//보여줄 폴더 지정
app.use(express.static(path.join(__dirname,"src")))
const PORT = process.env.PORT || 5001 ;

io.on("connection",(socket) =>{
    socket.on("chatting",(data) => {
        const {name, msg} = data;
        io.emit("chatting",{
            name,
            msg,
            time : moment(new Date()).format("h:ss A")
        })// 프론트로 보냄
    })
})

server.listen(PORT, () => console.log(`Server is running : ${PORT}`));