import React from 'react'
import { useNavigate } from 'react-router-dom'

const Start = () => {
  const navigate = useNavigate();
  const handleStart = ()=>{
    navigate("/login")
  }
  return (
    <div className='start'>
      <h1 className='startHeading'>ChatOut</h1>
      <h2 className='startDesc'>Find your friends, and Chat out your thoughts!!</h2>
      <button onClick={handleStart} >Get Started</button>
    </div>
  )
}

export default Start;