import React, { useEffect, useRef, useState } from "react";
import "./ItemRoom.css";
import Button from "@mui/material/Button";
import AlarmIcon from "@mui/icons-material/Alarm";
import TextField from "@mui/material/TextField";
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { calculateTimer } from '../../Timer/Timer';
import { inject } from 'mobx-react';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const itemId = useRef(useLocation().state.id);
  const enddate = useRef(useLocation().state.date);
  const [item, setItem] = useState(null)
   const timeLeft = useRef(new Date(useLocation().state.date).getTime() - new Date().getTime())
  const myTimer = useRef(null)
  const [timer, setTimer] = useState(timeLeft.current)
  const [bidInput, setBidInput] = useState("")
  const [bidStatus, setBidStatus] = useState(
    {
      isBid: true,
      finalMessage: "this bidding on this item ended",
    }
  )

  useEffect(() => {

    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/item?id=${itemId.current}`)
        checktime(res.data.item) 
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    fetchItem()

  }, [])

  useEffect(() => {
    
    myTimer.current = setInterval(TimeSlots, 1000);

    props.ItemsStore.socket.emit("join-room", itemId.current)

    props.ItemsStore.socket.on("bidding", bidData => {
    checktime(bidData.item)  
    
      // toast.success(msg, {
      //   // autoClose: 2000,
      // });
      // toast.clearWaitingQueue()
      // console.log(bidData)

    })

    return () => {
      clearInterval(myTimer.current)
      props.ItemsStore.socket.emit("leave-room", itemId.current)
    }

  }, [props.ItemsStore.socket])

  function TimeSlots() {
    timeLeft.current = new Date(enddate.current).getTime() - new Date().getTime()
    
    if (timeLeft.current > 0) {
      setTimer(calculateTimer(timeLeft.current))
    } else {
      setBidStatus({ isBid: false, finalMessage: "this bidding on this item ended" })
      toast.success("this bidding on this item ended", {
        autoClose: 3000,
      });
      clearInterval(myTimer.current)
    }
  }

  function bidHandler(e) {
    setBidInput(e.target.value)
  }


  function checktime(item) {
    const newBidingStatus= JSON.parse(JSON.stringify(bidStatus));
    if (timeLeft.current <= 0 && !item.available) {
      clearInterval(myTimer.current)
      newBidingStatus.isBid=false
      setBidStatus(newBidingStatus)
    }
    setItem(item)
  }
    

  async function addBid() {
    try {
      if (bidInput.trim() !== "" && bidInput.trim() > item.price) {
        const res = await axios.put(`http://localhost:4000/bid`,
          {
            bidValue: parseInt(bidInput),
            itemRoom: item._id,
            userId: user12._id,
            email: user12.email
          })

        setBidInput("")
        toast.success("You have the highest bid of: $" + res.data.bid, {
          autoClose: 2000,
        });
      } else {
        let msg = "bid input can not be empty," + "\n"
          + "bid must be a positive number," + "\n"
          + "also grater than the current price."
        toast.error(msg, {
          autoClose: 2000,
        })
      }
    } catch (error) {
      console.log(error);
      let err = error.response.data.errors
      let errMsg = error.response.data.param + " " + error.response.data.msg
      if (err) {
        errMsg = err[0].param + " " + err[0].msg
      }
      toast.error(errMsg, {
        autoClose: 2000,
      })
    }
  }

  return (
    item && <div className="room">
      <div className="item-details-container">
        <div className="item-details">
          {!bidStatus.isBid ? <div className="bid-text-end">{bidStatus.finalMessage}</div> : null}
          <div className="item-title font-effect-outline">{item.title}</div>
          <div className="timer">Time Left: <span className="timer-time">{timer.hr}:{timer.min}:{timer.sec}</span></div>
          <img src={item.imageURL} alt="" className="image-item-room" />
          <p>{item.description}</p>
          <div>Current price : {item.price}</div>
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
          {item.bids.map((bid, i) =>
            <div className="bidder-history" key={i}>
              <span className="bidder-name">{bid.user.split("@")[0]}: </span>
              <span className="bidder-value">${bid.bidAmount}</span>
            </div>)}
        </div>
      </div>
    </div>
  );
}


export default inject("AuthStore", "ItemsStore")(ItemRoom)
