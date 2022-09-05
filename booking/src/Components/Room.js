import { Cancel } from '@mui/icons-material'
import React, { useContext, useState } from 'react'
import './Roo.css'
import useFetch from '../Hooks/useFetch'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { SearchContext } from '../Context/SearchContext'
function Room({setOpenApp,days,hotelID,options}) {
    const [selectedRooms, setSelectedRooms] = useState([])
    const {data, loading, error } = useFetch(`http://localhost:5000/hotel/room/${hotelID}`)
    // console.log(data)
    const {date} = useContext(SearchContext)
    const handleSelect = (e) =>{
        const checked = e.target.checked
        const value = e.target.value
        setSelectedRooms( checked?[...selectedRooms, value]:selectedRooms.filter((item)=> item !== value))
    }
    const getDatesInRange = ( startDate, endDate) =>{
        const start = new Date(startDate)
        const end = new Date(endDate)
        const dates = new Date(start.getTime())
        const date = []

        while( dates <= end ){
            date.push(new Date(dates).getTime())
            dates.setDate(dates.getDate() + 1)
        }

        return date;
    }
    const alldates = getDatesInRange(date[0]?.startDate, date[0]?.endDate)
    const isAvailable = (roomNumber) =>{
        const isFound = roomNumber.unavailableDates.some((dates)=>(
            alldates.includes(new Date(date).getTime())
        ))
        return !isFound
    }
    const navigate = useNavigate()
    const roomName = data.map(item => item.title)
    console.log(roomName)
    const handleClick = async () =>{
        try{
            await Promise.all(
                selectedRooms.map((roomID) =>{
                    const res = axios.put(`http://localhost:5000/room/availability/${roomID}`,{date: alldates})
                    return res.data
                })
            )
            //navigate to payment
            navigate("/stripe",{state: {hotelID, roomName}})
        }catch(err){}
    }
  return (
    <div className="room">
            
            <Cancel onClick={()=>setOpenApp(false)} sx={{ width: 30, height: 30, color: "red"}} className='cancelX' />
        
       {data && data.map((item)=>(

       <div className="roomContainer" key={item._id}>
                    <div className='roomObject'>
             <b>Select your room:</b>
                <div className='rrContainer'>
                    <div className='subrContainer'>
                        <h1 style={{fontSize: 25,marginLeft: "-20px",padding: 10, fontWeight: 600}}> {item.title}</h1>
                        <p style={{ fontWeight: 600}}>{item.desc}</p>
                        <div className='dDisplay'>
                        <span style={{fontSize: 19, fontWeight: 600}}>Max people:</span><p style={{marginLeft: 20}}> {item.maxPeople}</p>
                        </div>
                        <div className='dDisplay'>
                        <span style={{fontSize: 19, fontWeight: 600}}>Price:</span><h2 style={{marginLeft: 20, color: "green",fontSize: "22", letterSpacing: "2px"}}>  ${item.price*days*options.room}</h2>
                        </div>
                    </div>
                  
                    {item && item.roomNumbers.map((roomNumber,i)=>{
                    return  <div className='checkboxContaiber' key={i}>
                        <div className='subBox'>
                            <p>{roomNumber.number}</p>
                            <input type='checkbox'
                             disabled={!isAvailable(roomNumber)} 
                             onChange={handleSelect} 
                             value={roomNumber._id}
                             />
                        </div>
                    </div> })}
                </div>
                <button className='rNutton'
                 onClick={handleClick}
                 >Reserve now</button>
            </div>
        </div>))}
    </div>
  )
}

export default Room