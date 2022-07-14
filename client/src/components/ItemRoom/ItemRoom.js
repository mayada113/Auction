import React, { useEffect, useState, useRef } from "react";
import "./ItemRoom.css";
import Button from "@mui/material/Button";
import AlarmIcon from "@mui/icons-material/Alarm";
import TextField from "@mui/material/TextField";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { calculateTimer } from '../../Timer/Timer';
import { inject } from 'mobx-react';
import io from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const socket = io.connect("http://localhost:4000")

const user12 = {
  "_id": "62c44e087a974b6a62d43cf4",
  "password": "$2b$10$jhlS1IsVEoxbAKp3jqp0yemnVKAuqGubQG.isQU2AQ8FMfkUoVXGm",
  "firstName": "khaled",
  "lastName": "wani",
  "email": "khaled@gmail.com",
  "Items": [],
  "historyItem": [],
  "__v": 0
}

function ItemRoom(props) {
  const item = useRef(useLocation().state)
  const [timer, setTimer] = useState(() => calculateTimer(
    new Date(item.current.dateOfExpire).getTime() - new Date().getTime()))
  const [bidInput, setBidInput] = useState("")
  const [bid, setBid] = useState(null)

  useEffect(() => {
    socket.emit("join-room", item.current._id)
    const myTimer = setInterval(() => {
      setTimer(calculateTimer(new Date(item.current.dateOfExpire).getTime() - new Date().getTime()))
    }, 1000);

    return () => {
      clearInterval(myTimer)
    }

  }, [])

  function bidHandler(e) {
    setBidInput(e.target.value)
  }

  socket.on("biding", biddata => {
    setBid(biddata)
  })

  function addBid() {
    if (bidInput.trim() !== "" && bidInput.trim() > item.current.price) {
      axios.post(`http://localhost:4000/bid`,
        {
          bidValue: parseInt(bidInput),
          itemRoom: item.current._id,
          userId: user12._id,
          email: user12.email
        }
      )
        .then(data => {
          console.log(data)
        })
        .catch((error) =>
          toast.error(
            error.response.data.errors[0].param +
            " " +
            error.response.data.errors[0].msg
          )
        );
    }
  }

  return (

    <div className="room">
      <div className="item-details-container">
        <div className="item-details">
          <div className="item-title font-effect-outline">{item.current.title}</div>
          <div className="timer">Time Left: <span className="timer-time">{timer.hr}:{timer.min}:{timer.sec}</span></div>
          <img src={item.current.imageURL} alt="" className="image-item-room" />
          <p>{item.current.description}</p>
          <div>Current bid : {item.current.price}</div>
          <ToastContainer
            position="top-center"
            autoClose={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
          />
          <div className="btn-input-bid-container">
            <TextField
              id="outlined-basic"
              label="Biding..."
              variant="outlined"
              size="small"
              type="number"
              name="bidingInput"
              onChange={bidHandler}
              className="bid-input"
              value={bidInput}
            />
            <Button
              variant="contained"
              color="success"
              className="btn-bid"
              size="small"
              onClick={addBid}
            >
              <AlarmIcon />
              Bid
            </Button>
          </div>
        </div>
      </div>

      <div className="side-bar-padding-history">
        <div className="bids-title">Bids</div>
        <div className="line-white"></div>
        <div className="bids-history">
          <div className="bidder-history">
            <span className="bidder-name">khaledwani: </span>
            <span className="bidder-value">${bid}</span>
          </div>
          <div className="bidder-history">
            <span className="bidder-name">ahmad gabarin: </span>
            <span className="bidder-value">${bid}</span>
          </div>
        </div>
      </div>
    </div>
  );
}


export default inject("AuthStore")(ItemRoom)
