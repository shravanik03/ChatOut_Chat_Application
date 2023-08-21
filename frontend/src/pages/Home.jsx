import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { Chat } from "../components/Chat";
import Welcome from "../components/Welcome";
import axios from "axios";

const Home = () => {
  const [currentChat, setCurrentChat] = useState(undefined);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [currUser, setCurrUser] = useState(userInfo);
  const [chatResponse, setChatResponse] = useState(null);
  function handleChatChange(chat) {
    setCurrentChat(chat);
  }
  const [selectedContact, setSelectedContact] = useState(null);
  const handleSelectedContact = async (contact) => {
    setSelectedContact(contact);
    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      const response = await axios.post(
        "http://localhost:5000/api/chat",
        { "currId": currUser.id, "userId": contact._id },
        config
      );
      console.log(response.data._id);
      setChatResponse(response.data);
    } catch (ex) {
      console.log("Something went wrong");
    }
  };
  return (
    <div className="home">
      <div className="container">
        <Sidebar
          currentUser={currUser}
          changeChat={handleChatChange}
          onSelectContact={handleSelectedContact}
        />
        {currentChat === undefined ? (
          <Welcome currentUser={currUser} />
        ) : (
          <Chat
            currentUser={currUser}
            selectedContact={selectedContact}
            chatResponse={chatResponse}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
