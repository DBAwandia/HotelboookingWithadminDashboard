import axios from 'axios'
import React, {useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RegisterContext } from '../Context/RegisterContext'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import "./Login.css"
function Registration() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] =useState("")
  const navigate = useNavigate()
  const { user, loading, dispatch, err} =useContext(RegisterContext)

  const handleRegister = async(e)=>{
    e.preventDefault()
    dispatch({type: "REGISTER_START"})
    try{
      const res = await axios.post("http://localhost:5000/userr/registers", {username: username,email: email, password: password})
      dispatch({type: "REGISTER_SUCCESS", payload: res.data.details})
      toast.success("SUCCESSFULLY CREATED")
      navigate("/login")
    }catch(err){
      dispatch({type: "REGISTER_FAIL", payload: err.res.details})
      toast.error("Check details")
    }
  }
 
  return (
    <div className='lContainers'>
    <div className='login'>
      <h1>REGISTER </h1>
      {err && "Use correct details"}
      <input type='text' required placeholder='Enter username' onChange={(e)=>setUsername(e.target.value)}/>
      <input type='email' required placeholder='Enter email' onChange={(e)=>setEmail(e.target.value)}/>
      <input type='password' required  placeholder='Enter password' onChange={(e)=>setPassword(e.target.value)} />
      <button onClick={handleRegister}>{loading ? "Registering.." :" Register"}</button>
      <div>
        <ToastContainer 
        position="top-right"
        autoClose={5000}
        draggablePercent={60}
        />
        <p>Dont have an account?</p>
        <Link to="/login">Login</Link>
      </div>
    </div>
    </div>
  )
}

export default Registration