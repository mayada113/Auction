import React from 'react'
import Item from './../Item/Item';
import { useEffect } from 'react';
import axios from 'axios';
import { inject, observer } from 'mobx-react';


function ItemsRooms(props) {

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/items?category=${props.ItemsStore.category}`)
        props.ItemsStore.setItems(res.data)
       
      } catch (error) {
        console.log(error);
      }
    }
    fetchItems()
  }, [props.ItemsStore.category,props.ItemsStore.load])

  useEffect(() => {
    
    props.ItemsStore.socket.on("reload", () => {
      props.ItemsStore.setLoad(props.ItemsStore.load+1)
    })
    
  }, [props.ItemsStore.socket])

  const items = props.ItemsStore.items
  return (
    items && <div className='Items'>{
      items.map((item, index) => <Item key={index} item={item}/>)
    }</div>
  )
}

export default inject("ItemsStore")(observer(ItemsRooms))