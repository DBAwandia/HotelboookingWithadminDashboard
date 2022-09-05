import React, {useContext, useEffect, useState} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { LoginContext } from '../Context/LoginContext'
import "./Login.css"
import {axiosInstance} from "../Utils/Utils"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] =useState("")
  const navigate = useNavigate()
  const { user,loading, error,dispatch} = useContext(LoginContext)
  const handleLogin = async(e)=>{
    e.preventDefault()
   
        dispatch({type: "LOGIN_START"})
        try{
            const res=  await axiosInstance.post("/userr/login", {email: email, password: password})
              if(res.data.isAdmin){
              dispatch({type: "LOGIN_SUCCESS",payload: res.data.details})
              navigate("/")
            }else{
              dispatch({type: "LOGIN_FAIL", payload: {message: "Not allowed"}})
            }
        }catch(err){
          dispatch({type:"LOGIN_FAIL", payload: err.response.message})
        }
  }
  return (
    <div className='lContainers'>
    <div className='login'>
      <h1>Login </h1>
      <input type='email' required placeholder='Enter email' onChange={(e)=>setEmail(e.target.value)}/>
      <input type='password' required  placeholder='Enter password' onChange={(e)=>setPassword(e.target.value)} />
      <button onClick={handleLogin}>{loading ? "User is Login" :" Login"}</button>
      <div>
        <p>Dont have an account?</p>
        <Link to="/register">Register</Link>
      </div>
    </div>
    </div>
  )
}

export default Login