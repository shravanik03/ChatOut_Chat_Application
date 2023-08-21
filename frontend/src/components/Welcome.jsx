import React, { useEffect, useState } from 'react';
import Robot from '../assets/robot.gif';

const Welcome = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const [currUser, setCurrUser] = useState(userInfo);
  return (
    <div className='welcome'>
        <img src={Robot} alt='Hello robot'/>
        <h1>
            Welcome, <span>{currUser.name} </span>
            !
        </h1>
        <h3>Find your friends and chat out your thoughts!!</h3>
    </div>
  )
}

export default Welcome