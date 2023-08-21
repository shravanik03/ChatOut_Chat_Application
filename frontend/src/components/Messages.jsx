import React, { useEffect, useState } from "react";
import { Message } from "./Message";
import axios from "axios";
import io from 'socket.io-client';
const ENDPOINT = 'http://localhost:5000';
var socket, selectedChatCompare;

export const Messages = ({ selectedContact, currentUser, chatResponse}) => {
  const [newMessage, setNewMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [socketConnected, setsocketConnected] = useState(false);
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", currentUser);
    socket.on('connection', () => {
      setsocketConnected(true);
    });
  }, [])
  const fetchMessages = async () => {
    if (!chatResponse) return;
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        }
      }
      const response = await axios.get(`/api/message/${chatResponse._id}`, config);
      setMessages(response.data);
      socket.emit('join chat', chatResponse._id)
    } catch (ex) {
      console.log(ex);
    }
  }
  useEffect(() => {
    fetchMessages();
    selectedChatCompare = chatResponse;
  }, [chatResponse]);

  useEffect(() => {
    socket.on('message received', (newMessageReceived) => {
      if(!selectedChatCompare || selectedChatCompare._id!== newMessageReceived.chat._id){

      }else{
        setMessages([...messages,newMessageReceived]);
      }
    })
  })
  

  const sendMessage = async () => {
    if (newMessage) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          }
        }
        const response = await axios.post(`api/message/${currentUser.id}`, {
          content: newMessage,
          chatId: chatResponse._id,
        }, config);
        console.log(response.data);
        setNewMessage("");
        socket.emit('new message', response.data)
        setMessages([...messages, response.data]);
      } catch (ex) {
        console.log(ex)
      }
    }
  }
  

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  }
 
  return <>{loading ? <p>Loading</p> :
    <div className="messages">
      {loading ? <p>Loading</p> : (
        messages.map((message) => (
          <Message key={message._id} message={message} currentUser={currentUser} />
        ))
      )}
    </div>
  }
    <div className='input'>
      <input value={newMessage} onChange={typingHandler} type='text' placeholder='Enter your message' />
      <div className='send'>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  </>;
};
