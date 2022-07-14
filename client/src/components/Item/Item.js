import React from "react";
import { Link} from "react-router-dom";
import './Item.css'
function Item(props) {
  const item=JSON.parse(JSON.stringify(props.item));
  console.log(item)

  return ( 
        <Link className="item" to="/biding-room" state={item}>
            <div className="item-title">{props.item.title}</div>
            <img src={props.item.imageURL} alt='' className="image-item" />
            <div>Time Left :
              <span className="time-left-value"> less than 24h</span>
            </div>
            <div className="current-bid-div" >Current price :
              <span className="current-bid-vlaue"> {props.item.price}</span>
            </div>
        </Link>

  );
}

// <Item
//         itemTitle="iphone 13"
//         itemPrice={5}  
//         itemTimer="2:01:00"
//         itemImg="https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-01.jpg"
//       />

export default Item;
