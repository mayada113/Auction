import axios from "axios";
import React, { useState } from "react";
import {useNavigate,useLocation } from "react-router-dom";
import { observer, inject } from 'mobx-react'
import "./LogIn.css";

function LogIn(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location =useLocation();
  const from = location.state?.from?.pathname || "/mainPage"
  const LogInHandler = () => {
    axios
      .post(`http://localhost:4000/login`, {
        username: username,
        password: password,
      })
      .then((response) => { 
          console.log(response.data);
          props.AuthStore.setLogInStatus(response.data.auth,response.data.user); 
          if(props.AuthStore.auth) {navigate(from,{replace:true})} 
           
      });
  };

  return (
    <div className="login-container">
      <div>
        <div className="nested-login-container">
          <div className="login-title">Login</div>
          <input
            placeholder="Email"
            className="input-login"
            type="email"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="input-login"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            type={`password`}
          />
          <div>
            <button onClick={LogInHandler} className={`btn-login`}>
              Login
            </button>
            <div className="sign-in-txt-container">
              <span className="sing-in-txt" onClick={() => navigate(`/signup`)}>
                Sign In
              </span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default inject("AuthStore")(observer(LogIn));
