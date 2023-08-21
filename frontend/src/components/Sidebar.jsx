import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Search } from "./Search";
import { Chats } from "./Chats";

export const Sidebar = ({ currentUser, changeChat, onSelectContact}) => {
  const [searchResponse, setSearchResponse] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleContactSelection = (contact) => {
    setSelectedContact(contact);
    onSelectContact(contact);
  };

  const handleSearchResponse = (response) => {
    setSearchResponse(response);
  };

  return (
    <div className="sidebar">
      <Navbar currUser={currentUser} />
      <Search currUser={currentUser} onSearchResponse={handleSearchResponse} />
      <Chats
        currUser={currentUser}
        changeChat={changeChat}
        searchResponse={searchResponse}
        onContactClick={handleContactSelection}
      />
    </div>
  );
};
