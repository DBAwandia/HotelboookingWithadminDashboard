import React, {useState,useEffect} from 'react'
import './NewHotels.css'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import axios from 'axios'
import {useLocation} from 'react-router-dom'



function NewHotelProduct(){
    const [images, setImages] = useState('')
    const[name, setName]= useState('')
    const[success, setSuccess] = useState(false)
    const[type, setType] =useState('')
    const[rooms, setRooms] =useState([])
    const[options, setOptions] = useState("")
    const [cheapestPrice, setCheapestPrice] = useState('')
    const [city, setCity] = useState('')
    const [desc, setDesc] = useState('')
    const [title, setTitle] =useState('')
   
    const location = useLocation()
    const ids = location.pathname.split("/")[2]
    const handleSubmitts = async(e) =>{
      e.preventDefault()

      try{

       const lists = await Promise.all(Object.values(images).map(async(image)=>{
          const datas = new FormData()
          datas.append("file", image)
          datas.append("upload_preset","wandia")
          const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/wandia/image/upload", datas)
          const URL= uploadRes.data.url
          return URL
          
      })
      
      )

      const newhotel ={name,type,cheapestPrice,desc,title,city,photos: lists}

      await axios.put(`/api/hotel/hotel/${ids}`, newhotel)
        setSuccess(true)
        
      }catch(err){
        console.log(err)
      }
    }

    return(
        <div className='new'>
            <Navbar/>
            <div className='newContainer'>
                <div className='newSidebarss'>
                    <Sidebar/>
                </div>
                <div className='newSidebarContain'>
                    <div className='outlineContain'>
                        <div className='newTOP'>
                            <h1>Add New hotel</h1>
                        </div>
                         <div className='newBottom'>
                            <div className='imageOptions'>
                                <img src={images ? URL.createObjectURL(images[0]) : "/images/work.png"}  alt=''/>
                            </div>
                            <div className='inputOptionss'>
                              <div className='optOptions'>
                                <h1>Image: </h1>
                                <input type='file' multiple onChange={(e)=>setImages(e.target.files)} id='image'  />
                              </div>
                              <div className='optOptions'>
                                <p>Name</p>
                                <input type='text' onChange={(e)=>setName(e.target.value)} placeholder='Enter name'  />
                              </div>
                              <div className='optOptions'>
                                <p>Title</p>
                                <input type='text' onChange={(e)=>setTitle(e.target.value)} placeholder='Enter title'  />
                              </div>
                              <div className='optOptions'>
                                <p>CheapestPrice</p>
                                <input type='number' onChange={(e)=>setCheapestPrice(e.target.value)} placeholder='Enter price'  />
                              </div>
                              <div className='optOptions'>
                                <p>Description</p>
                                <input type='text' onChange={(e)=>setDesc(e.target.value)} placeholder='Enter description'  />
                              </div>
                         
                              <div className='optOptions'>
                                <p>Type</p>
                                <input type='text' onChange={(e)=>setType(e.target.value)} placeholder='Enter type'  />
                              </div>
                              <div className='optOptions'>
                                <p>City</p>
                                <input type='text' onChange={(e)=>setCity(e.target.value)} placeholder='Enter city'  />
                              </div>
                              <div className='optOptions'>
                                <p>FEATURED</p>
                                <select id='featured' onChange={(e)=> setOptions(e.target.value)}>
                                  <option value={false}>No</option>
                                  <option value={true}>Yes</option>
                                </select>
                              </div>
                            </div>
                        </div>
                        {success && "user updated"}
                      
                        <button className='ooptButtons' onClick={handleSubmitts}>Send</button>

                    </div>
                </div>

            </div>
        </div>
    )
}
export default NewHotelProduct