import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Header = ({ filter, setFilter }) => {


  const handleChange = (event) => {
    setFilter(event.target.value);
  };


  return <>
    <div className='header'>

      <h1 >To-Do </h1>
      <div className='selectTask'>
        <FormControl sx={{ m: 1, minWidth: 80}}>
          <InputLabel >Tasks</InputLabel>
          <Select
            value={filter}
            onChange={handleChange}
            autoWidth
            label="Tasks"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>

  </>
}

export default Header