import React, { useState } from 'react'
import { Messages } from './Messages';

export const Chat = ({ currentUser, selectedContact, chatResponse }) => {
  
  return (
    <div className='chat'>
      <div className='chatInfo'>
        <img src={require(`../userPics/${selectedContact.pic}`)} alt='' />
        <span>{selectedContact.name}</span>
      </div>
      <Messages selectedContact={selectedContact} currentUser={currentUser} chatResponse={chatResponse}  />
    </div>
  )
}

