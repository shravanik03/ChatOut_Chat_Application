import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';

export const Navbar = ({currUser}) => {
  const navigate = useNavigate();
  const logout = ()=>{
    localStorage.clear();
    navigate("/");
  }
  return (
    <div className='navbar'>
      <div className='brand'>
        <img src={Logo} alt="Logo" />
        <span>ChatOut</span>
      </div>
      <div className='user'>
        <img src={require(`../userPics/${currUser.pic}`)} alt=''/>
        <span>{currUser.name}</span>
        <button onClick={logout}>
          <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" className='logout' />
        </button>
      </div>
    </div>
  )
}
