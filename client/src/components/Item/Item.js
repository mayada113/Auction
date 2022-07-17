import React from "react";
import { Link } from "react-router-dom";
import './Item.css'
import { calculateTimer } from '../../Timer/Timer';
function Item(props) {
  const item = JSON.parse(JSON.stringify(props.item));
  const fetchTimer = () => {
    let message
    const timer = calculateTimer(new Date(item.dateOfExpire) - new Date())
    if (parseInt(timer.hr) > 0) {
      message = `Less than ${timer.hr}h`
    } else if (timer.min) {
      message = `${timer.min}m remains`
    } else {
      message = `${timer.sec}s remains`
    }
    return message
  }

  return (
    <Link className="item" to="/biding-room" state={item._id}>
      <div className="item-title">{props.item.title}</div>
      <img src={props.item.imageURL} alt='' className="image-item" />
      <div>Time Left :
        <span className="time-left-value">{fetchTimer()}</span>
      </div>
      <div className="current-bid-div" >Current price :
        <span className="current-bid-vlaue"> {props.item.price}</span>
      </div>
    </Link>

  );
}


export default Item;
