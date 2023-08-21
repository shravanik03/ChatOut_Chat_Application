import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Search = ({ currUser, onSearchResponse }) => {
  const [value,setValue] = useState('');
  const handleChange = (e) =>{
    setValue(e.target.value);
  }
  const onSearch = async() => { 
    const response = await axios.get(`http://localhost:5000/api/user/${currUser.id}?search=${value}`);
    onSearchResponse(response.data);
  }
  return (
    <div className='search'>
      <div className='searchForm'>
        <input type='text' value={value} onChange={handleChange} placeholder='Find a friend'/>
        <button onClick={onSearch}><FontAwesomeIcon icon="fas fa-search" /></button>
      </div>
      
    </div>
  )
}
