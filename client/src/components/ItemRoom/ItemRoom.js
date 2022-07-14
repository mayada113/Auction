import React, { useEffect, useRef, useState } from "react";
import "./ItemRoom.css";
import Button from "@mui/material/Button";
import AlarmIcon from "@mui/icons-material/Alarm";
import TextField from "@mui/material/TextField";
import { useLocation } from "react-router-dom";
import socket from "../../socketManager/socketManager";
import axios from "axios";
import { inject } from "mobx-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ItemRoom(props) {
  const [timer, setTimer] = useState(() => calculateTimer());
  const [item, setItem] = useState(useLocation().state);
  const [bidInput, setBidInput] = useState("");
  const [bid, setBid] = useState(0);

  console.log(item);
  useEffect(() => {
    socket.joinRoom(item.id);
    const myTimer = setInterval(() => {
      setTimer(calculateTimer);
    }, 1000);

    return () => {
      clearInterval(myTimer);
    };
  }, []);

  function calculateTimer() {
    let dateOfExpire = new Date("Jul 7, 2022 7:30 PM").getTime();
    let now = new Date().getTime();
    let minute = 1000 * 60;
    let hour = minute * 60;
    let day = hour * 24;
    let gap = dateOfExpire - now;
    let hours = Math.floor((gap % day) / hour);
    let minutes = Math.floor((gap % hour) / minute);
    let secs = Math.floor((gap % minute) / 1000);
    hours = hours < 10 ? "0" + hours : "" + hours;
    minutes = minutes < 10 ? "0" + minutes : "" + minutes;
    secs = secs < 10 ? "0" + secs : "" + secs;
    return {
      hr: hours,
      min: minutes,
      sec: secs,
    };
  }

  function bidHandler(e) {
    setBidInput(e.target.value);
  }

  socket.socket.on("biding", (biddata) => {
    setBid(biddata);
  });

  function addBid() {
    if (bidInput.trim() !== "") {
      axios
        .post(`http://localhost:4000/bid`, {
          bidValue: parseInt(bidInput),
          itemRoom: item.id,
        })
        .then((data) => {
          console.log(data);
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
          <div className="item-title font-effect-outline">{item.title}</div>
          <div className="timer">
            Time Left:{" "}
            <span className="timer-time">
              {timer.hr}:{timer.min}:{timer.sec}
            </span>
          </div>
          <img src={item.imageURL} alt="" className="image-item-room" />
          <p>{item.description}</p>
          <div>Current bid : {item.price}</div>
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

export default inject("ItemsStore")(ItemRoom);
