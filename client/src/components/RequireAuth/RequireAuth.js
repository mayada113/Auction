import React from 'react'
import { observer, inject } from 'mobx-react'
import {Navigate, Outlet, useLocation} from "react-router-dom";
import Navbar from './../Navbar/Navbar';
function RequireAuth(props) {
  const auth =props.AuthStore.auth
  const user =props.AuthStore.user
  const location = useLocation()
  
  return (
      auth && user?
      <>
       <Navbar/>
       <Outlet/>
      </>
      :<Navigate to="/" state={{from:location}} replace/>
  )
}

export default inject("AuthStore")(observer(RequireAuth));
