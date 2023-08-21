import React from 'react';

export const Message = ({message, currentUser}) => {
  const isCurrentUserMessage = message.sender._id === currentUser.id;
  return (
    <div className={`message ${isCurrentUserMessage ? 'owner' : ''}`}>
      <div className='messageInfo'>
        <img src={require(`../userPics/${message.sender.pic}`)} alt='' />
        <span>just now</span>
      </div>
      <div className='messageContent'>
        <p>{message.content}</p>
      </div>
    </div>
  )
}
