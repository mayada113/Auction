import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../MainPage/MainPage";
import Navbar from "./../Navbar/Navbar";
import "./Container.css";
import AddItem from "./../AddItem/AddItem";
import LogIn from "../LogIn/LogIn";
import ItemRoom from "../ItemRoom/ItemRoom";
import SignUp from "../Sign-up/SignUp";
import RequireAuth from "../RequireAuth/RequireAuth";
import Profile from "../Profile/Profile.";
function Container() {
  return (
    <div className="Container">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<LogIn />} /> */}
          <Route path="/signup" element={<SignUp />} />
          {/* <Route element={<RequireAuth />} > */}
            <Route path="/" element={<MainPage />} />
            <Route path="/additem" element={<AddItem />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/biding-room" element={<ItemRoom />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Container;
