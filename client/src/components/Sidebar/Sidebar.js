import React from "react";
import "./Sidebar.css";
import { inject } from 'mobx-react';

function Sidebar(props) {

  const setCategory=(e)=>{
    
     props.ItemsStore.setcategory(e.target.textContent);
  }
  return (
    <div className="side-bar">

      {props.catagories.map((category, index) => (
        <div key={index} className={`category`} onClick={setCategory} >
          {category}
        </div>
      ))}
    </div>
  );
}

export default  inject("ItemsStore")(Sidebar);
