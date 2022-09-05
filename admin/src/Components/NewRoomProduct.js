import React, {useState} from 'react'
import './NewRoomProduct.css'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import useFetch from './useFetch'
import axios from 'axios'
import {axiosInstance} from "../Utils/Utils"


function NewRoomContainer(){
    const [maxPeople, setMaxpeople] = useState('')
    const [price, setPrice] =useState('')
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [success, setSuccess] = useState(false)
    const [hotelId, setHotelId] = useState(undefined)
    const [rooms, setRooms] = useState([])
    const {data} = useFetch('/hotel/finds')
    const handleClick =  async(e) =>{
      e.preventDefault()
      const roomNumbers = rooms.split(",").map(room=>({number: room}))
      console.log(roomNumbers,hotelId)
          try{
            await axiosInstance.post(`/room/${hotelId}`, {roomNumbers})
            setSuccess(true)
          }catch(err){
            console.log(err)
          }
    }
    return(
        <div className='new'>
            <Navbar/>
            <div className='newContainer'>
                <div className='newSidebarsss'>
                    <Sidebar/>
                </div>
                <div className='newSidebarContains'>
                    <div className='outlineContains'>
                        <div className='newTOP'>
                            <h1>Add New room</h1>
                        </div>
                         <div className='newBottom'>
                            <div className='inputOptionss'>
                              <div className='optOptions'>
                                <p>Title</p>
                                <input type='text' onChange={(e)=>setTitle(e.target.value)} placeholder='Edit title'  />
                              </div>
                              <div className='optOptions'>
                                <p>Max People</p>
                                <input type='number' onChange={(e)=>setMaxpeople(e.target.value)} placeholder='Enter number of people'  />
                              </div>
                              <div className='optOptions'>
                                <p>Description</p>
                                <input type='text' onChange={(e)=>setDesc(e.target.value)} placeholder='Enter description'  />
                              </div>
                              <div className='optOptions'>
                                <p>Rooms</p>
                                <textarea onChange={e=>setRooms(e.target.value)} placeholder='Give comma btw room numbers' />
                              </div>
                              <div className='optOptions'>
                                <p>Room number</p>
                                <input type='number' onChange={(e)=>setMaxpeople(e.target.value)} placeholder='Enter number of rooms'  />
                              </div>
                              <div className='optOptions'>
                                <p>Price</p>
                                <input type='number' onChange={(e)=>setPrice(e.target.value)} placeholder='Enter price'  />
                              </div>
                              <div className='optOptions'>
                                <p>Choose a hotel</p>
                                <select id="hotelId" onChange={e=>setHotelId(e.target.value)}>
                                    {data?.map((item)=>{
                                          return <option className='optionss' key={item._id} value={item._id}>
                                            {item.name}
                                          </option>
                                          })}
                                </select>
                              </div>
                            </div>
                        </div>
                        {success && "room updated"}
                        <button className='ooptButtons' onClick={handleClick}>Send</button>

                    </div>
                </div>

            </div>
        </div>
    )
}
export default NewRoomContainer