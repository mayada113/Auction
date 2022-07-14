import React from 'react'
import './Searchbar.css'
import TextField from '@mui/material/TextField';
import {inject} from 'mobx-react';

function  Searchbar (props){

  function search(e) {
    const searchedValue = e.target.value;
    
    const filteredItems = props.ItemsStore.items.filter((item) =>
      item.title.toLowerCase().includes(searchedValue.toLowerCase())
    );
     
    props.ItemsStore.items=filteredItems
  }

  
  return (
    <div className='search-bar'>
      <TextField id="standard-basic" label="Search" 
         variant="standard" name='searchInput' onChange={search} size='small'/>
    </div>
  )
}

  



export default inject("ItemsStore")(Searchbar)