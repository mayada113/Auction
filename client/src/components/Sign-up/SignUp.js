import React, { useState } from 'react'
import './SignUp.css'
import axios from "axios";
import validator from "validator";


function SignUp() {
  const [values , setValues] = useState({firstName : `` , lastName : `` , email : `` , password : ``})
  const updateInputs = (e) =>setValues({...values ,[e.target.name] : e.target.value})
  const port = 4000
  
  const  signUp = async () => {
    if (validator.isEmail(values[`email`].trim())) {
      try {
        const user = await axios.post(`http://localhost:${port}/signup` , values)
        console.log(user.data)
        
      } catch (error) {
        console.log(error);
      }
    }
  } 

  return (
    <div className='sign-up-container'>
      <div className='nested-grid-signup'>
        <div className='sign-up-title'> <span className='signup-title'>Sign Up</span> </div>

        <div className='first-last-name'>

          <input placeholder='First Name' className='input-firstName' value={values[`firstName`]} 
          name = {`firstName`} onChange = {updateInputs}></input>

          <input placeholder='Last Name' className='input-lastName' value={values[`lastName`]}
           name = {`lastName`} onChange = {updateInputs} ></input>
        </div>

        <input placeholder='Email' className='input' value={values[`email`]}
         name = {`email`} onChange = {updateInputs}></input>

        <input placeholder='Password' className='input' value={values[`password`]}
          name = {`password`} onChange = {updateInputs} type={`password`} ></input>

        <div className='btn-sign-up'>
          <button className='btn-signup' onClick = {signUp} >Sign Up</button>
        </div>
      </div>
    </div>
  )
}

export default SignUp