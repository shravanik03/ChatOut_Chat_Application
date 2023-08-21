import React, { useState, useEffect } from "react";
import axios from "axios";

export const Chats = ({
  currUser,
  changeChat,
  searchResponse,
  onContactClick,
}) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    func();
  }, [currUser]);

  const func = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/user/allUsers/${currUser.id}`
    );
    const chatsResponse = await axios.get(
      `http://localhost:5000/api/chat/${currUser.id}`
    );

    // Create a map of userId to latest message
    const latestMessagesMap = new Map();
    chatsResponse.data.forEach((chat) => {
      if (chat.latestMessage) {
        latestMessagesMap.set(
          chat.users.find((user) => user._id !== currUser.id)._id,
          chat.latestMessage
        );
      }
    });

    // Combine contacts with latest messages
    const contactsWithLatestMessages = response.data.map((contact) => ({
      ...contact,
      latestMessage: latestMessagesMap.get(contact._id),
    }));

    setContacts(contactsWithLatestMessages);
  };

  const [currSelected, setCurrentSelected] = useState(undefined);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
    onContactClick(contact);
  };

  return (
    <div className="chats">
      {searchResponse === null
        ? contacts.map((contact, index) => {
            return (
              <div
                className="userChat"
                key={index}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <img src={require(`../userPics/${contact.pic}`)} alt="" />
                <div className="userChatInfo">
                  <span>{contact.name}</span>
                  {contact.latestMessage ? <p>{contact.latestMessage.content}</p> : null}
                </div>
              </div>
            );
          })
        : searchResponse.map((result, index) => {
            return (
              <div
                className="userChat"
                key={index}
                onClick={() => changeCurrentChat(index, result)}
              >
                <img src={require(`../userPics/${result.pic}`)} alt="" />
                <div className="userChatInfo">
                  <span>{result.name}</span>
                  {result.latestMessage ? <p>{result.latestMessage.content}</p> : null}
                </div>
              </div>
            );
          })}
    </div>
  );
};
