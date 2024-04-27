"use strict"

const socket = io(); // socket변수에 client socket을 담아줌
const nickname = document.querySelector("#nickname");
const chatList = document.querySelector(".chatting-list"); // chatting list 클래스 가져옴
const chatInput = document.querySelector(".chatting-input"); // chatting input 클래스 가져옴
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container");

chatInput.addEventListener("keypress",(event) => {
    if(event.keyCode == 13) send();
})

function send(){
    const param = {
        name : nickname.value,
        msg : chatInput.value
    }
    socket.emit("chatting",param) // front에서 보낸 값을 서버에서 받음
}

// 이벤트 지정
sendButton.addEventListener("click",send())


socket.on("chatting", (data) => {
    console.log(data);
    const {name,msg,time} = data
    const item = new LiModel(name,msg,time); // 인스턴스화 (초기화)
    item.makeLi()//메시지 호출해서 ul에 집어넣음
    displayContainer.scrollTo(0,displayContainer.scrollHeight); //최신 메시지로 스크롤 이동
}) // 서버에서 보내준 데이터 확인

function LiModel(name,msg,time){
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = () => {
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent" : "recevied")
        const dom = `<span class="profile">
        <span class="user">${this.name}</span>
        <img class="image"  src="https://picsum.photos/50/50" alt="any">
    </span> 
    <span class="message">${this.msg}</span> 
    <span class="time">${this.time}</span> `
    li.innerHTML = dom;
    chatList.appendChild(li);
    }
}