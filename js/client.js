const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const inpMessage = document.getElementById('inputMessage');
const messageContainer = document.querySelector(".container");
var audio = new Audio('ting.mp3');

const append = (message,position)=>{

    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}

const user = prompt("Enter your name to join the chat");
socket.emit('new-user-joined', user);

//display if any new user has joined
socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'middle');
});


//event for the send button
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = inpMessage.value;
    append(`You: ${message}`,'right');
    socket.emit('send', message);
    inpMessage.value = "";
})

//displays name and message 
socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left');
})

//displays if a user is disconnected
socket.on('leave',name=>{
    append(`${name} has left the chat`,'middle');
})