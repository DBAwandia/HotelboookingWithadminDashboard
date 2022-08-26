import React, { useState,useRef } from 'react'
import './Hotel.css'
import Navbar from './Navbar'
import PropertyList from './PropertyList'
import {Bounce } from 'react-reveal'
import { useLocation } from 'react-router-dom'
import {ManageSearch} from '@mui/icons-material'
import useFetch from '../Hooks/useFetch'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range'
import OrderHistory from './OrderHistory'
import { format } from 'date-fns'

function Hotel() {
    const location = useLocation()
    const[openDate, setOpenDate] = useState(false)
    const[sidebar, setSidebar] = useState(false)
    const [date, setDate] = useState(location.state.date)
    const [ destination, setDestination] = useState(location.state.destination)
    const [options,setOptions] = useState(location.state.options)
    const { data, loading ,error,reFetch} = useFetch(`http://localhost:5000/hotel/finds?city=${destination}`)
    const handleClick = ()=>{
        reFetch()
    }
    
    const keys = ["name", "city", "type"]
    const Search =(items) =>{
        return items.filter((item)=>{
            return keys.some(key =>item[key].toLowerCase().includes(destination)
            )
                
        })
    }
  return (
    <div className='hotel'>
        
        <Navbar/>
       
                   <div className='sidebarSticky'>
                   {sidebar && <div className='OrderHistoryHotel'>
                        <OrderHistory  setSidebar={setSidebar} />
                    </div>}
                   </div>
                     <div clasName='manageSearch'>
                        <ManageSearch onClick={()=>setSidebar(true)} sx={{position: "absolute",top:59,color: 'white', right: 85,cursor:"pointer", fontSize: 55}}/>
                    </div>
                  
        <div className='hotelContainer'>
       
            
            <div className='lSidebar'>
                <div className='positions'>
                    <div className="pSticky">
                    <Bounce>
                <div className='leftContainer'>
                    <div className='contants'>
                        <h1>Search</h1>
                        <div className='inputOption'>
                            <p className='label'>Description</p>
                                <input type='text' placeholder={destination} onChange={(e)=>setDestination(e.target.value.toLowerCase())}/>
                                <p className='label'>CHECK-in-DATES</p>
                            <span onClick={()=>setOpenDate(!openDate)}>{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")}`} </span>
                            {openDate && <DateRange
                                        className='openDatess'
                                        editableDateInputs={true}
                                        onChange={item => setDate([item.selection])}
                                        moveRangeOnFirstSelection={false}
                                        ranges={date}
                                        />}
                        </div>
                        <h2>Options</h2>
                        <div className='optionInputs'>
                            <div className='inputOptions'>
                                <b>Min price per night</b>
                                <input type='text'  className='mins'/>
                            </div>
                            <div className='inputOptions'>
                                <b>Max price per night</b>
                                <input type='text' className='nights'/>
                            </div>
                            <div className='inputOptions'>
                                <b>Rooms</b>
                                <input min={1} type='number' placeholder={options.room}  className='rnumbers'/>
                            </div>
                        </div>
                    </div>
                    <button onClick={handleClick}>Search</button>
                </div>
                </Bounce>
                </div>
                </div>
            </div>
            <div className='rSidebar'>
                
                     {/* <div className='rightContainer'> */}
                   
                      {/* {Search(data).map((itemm,i)=>{
                        return <div key={i}>
                            <p>{itemm.title}</p>
                            </div>
                      })} */}
                  
                 {/* </div> */}
                    
                         <PropertyList loading={loading} items={Search(data)}  />

            </div>
        </div>

    </div>
  )
}

export default Hotel