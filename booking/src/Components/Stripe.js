import React,{useState,useEffect,useContext} from 'react'
import './Stripe.css'
import {useNavigate,useLocation} from 'react-router-dom'
import { DetailsContext } from '../Context/DetailsContext';
import axios from 'axios'
function Stripe() {
  const [name,setName] = useState("")
  const [number,setNumber] = useState("")
  const [areas,setAreas] = useState("")
  const [town,setTown] = useState("")
  const [province,setProvince] = useState("")
  const navigate = useNavigate()
  const {savedData,loading,error,dispatch} = useContext(DetailsContext)
    const location = useLocation()
    const stripeID = location.state.hotelID
  const handleSubmitDocuments = async(e) =>{
    e.preventDefault()
    
    dispatch({type:"LOADING_DETAILS"})
      try{
      const res = await axios.post("http://localhost:5000/Orders/stripecomplete",{name: name, areas: areas, province: province,town: town, number: number})
      dispatch({type:"LOADED_DETAILS", payload: res.data})
      navigate("/completed",{state: {stripeID}})
      }catch(err){
    dispatch({type:"ERROR_DETAILS", payload: err.res.message})
        
      }
    
  }

  return (
    <div className='stripeContainer'>
      <div className='divContainer'>
        <h1 style={{color: "teal", letterSoacing: 2,fontSize: 23,fontWeight: 600,margin:" 8px 5px",}}>BILLING ADDRESS </h1>
        <div className='labelInput'>
          <label>Full Name</label>
          <input required type='text' placeholder='Enter name' onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className='labelInput'>
          <label>Phone number</label>
          <input required type='number' min={1} placeholder='+254792345678'  onChange={(e)=>setNumber(e.target.value)}/>
        </div>
        <div className='labelInput'>
          <label> Area, street, colony</label>
          <input required type='text' placeholder='Enter area'  onChange={(e)=>setAreas(e.target.value)}/>
        </div>
        <div className='labelInput'>
          <label>Town/City</label>
          <input required type='text' placeholder='city/town'  onChange={(e)=>setTown(e.target.value)}/>
        </div>
        <div className='labelInput'>
          <label>State/Province</label>
          <input required type='text'  onChange={(e)=>setProvince(e.target.value)}/>
        </div>
        <div className='buttonContainers'>
        <button onClick={handleSubmitDocuments}>{loading?"Confirming...": "Confirm"}</button>
        {error && "user error"}
      </div>
      </div>
    </div>
  )
}

export default Stripe