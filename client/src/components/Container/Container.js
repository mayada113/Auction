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
function Container() {
  return (
    <div className="Container">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<LogIn />} /> */}
          <Route path="/signup" element={<SignUp />} />
          {/* <Route element={<RequireAuth/>} > */}
            {/* <Route path="/mainPage" element={<MainPage />} /> */}
            <Route path="/additem" element={<AddItem />} />
          {/* </Route> */}
          <Route path="/" element={<MainPage />} />
          <Route path="/biding-room" element={<ItemRoom />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Container;
