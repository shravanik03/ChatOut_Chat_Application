import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'

export const Input = ({ selectedContact, currentUser, chatResponse}) => {
  const [newMessage, setNewMessage] = useState();
  
  
  const sendMessage = async () =>{
    if(newMessage){
      try{
        const config = {
          headers : {
            "Content-type" : "application/json",
          }
        }
        const response = await axios.post(`api/message/${currentUser.id}`,{
          content : newMessage,
          chatId : chatResponse._id,
        }, config);
        console.log(response.data);
        setNewMessage("");
      }catch(ex){
        console.log(ex)
      }
    }
  }
  const typingHandler =  (e) => {
    setNewMessage(e.target.value);
  }
  return (
    <div className='input'>
      <input value={newMessage} onChange={typingHandler} type='text' placeholder='Enter your message'/>
      <div className='send'>
        
        <input type='file' style={{display:"none"}} id='file'/>
        <label htmlFor='file'>
          <FontAwesomeIcon className='iconI' icon="fa-regular fa-image" />
        </label>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}
