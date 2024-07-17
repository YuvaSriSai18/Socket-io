import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:8080");

function App() {

  // Room State

  const [room, setRoom] = useState('');


  //Message State
  const [message, setMessage] = useState("");

  const joinRoom = () => {
    if(room !== ""){
      socket.emit('join_room',room)
    }
  }

  const sendMessage = () => {
    socket.emit('send_message', { message });
    setMessage("");  // Clear the input field after sending the message
  };

  useEffect(() => {
    socket.on('received_message', (data) => {
      // console.log(data)
      alert(`Received Data: ${data.message}`);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('received_message');
    };
  }, []);

  return (
    <>
      {/* <input 
        type="text" 
        placeholder="Message..." 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
      />
      <button onClick={sendMessage}>Send Message</button> */}

      <input type="number" name="" placeholder="Room Number" id="" onChange={e=> setRoom(e.target.value)}/>
      <button onClick={joinRoom}>Join Room</button>

      <input type="text" name="" placeholder="Message ..." id="" onChange={e => setMessage(e.target.value)}/>
    </>
  );
}

export default App;
