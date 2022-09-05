import React, {useState,useEffect} from 'react'
import './NewContainer.css'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import axios from 'axios'
import {useLocation} from 'react-router-dom'
import {axiosInstance} from "../Utils/Utils"



function NewUserContainer(){
    const [images, setImages] = useState('')
    const[username, setUserName]= useState('')
    const[success, setSuccess] = useState(false)
    const[email, setEmail] =useState('')
    const[phonenumber, setPhonenumber] = useState("")

   
    const location = useLocation()
    const ids = location.pathname.split("/")[3]
    const handleSubmitts = async(e) =>{
      e.preventDefault()

      try{

    
          const datas = new FormData()
          datas.append("file", images)
          datas.append("upload_preset","wandia")
          const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/wandia/image/upload", datas)
          const URL= uploadRes.data.url

      const newuser ={username,email,phonenumber,photos: URL}

      await axiosInstance.put(`/userr/updates/${ids}`, newuser)
        setSuccess(true)
        
      }catch(err){
        console.log(err)
      }
    }

    return(
        <div className='new'>
            <Navbar/>
            <div className='newContainer'>
                <div className='newSidebar'>
                    <Sidebar/>
                </div>
                <div className='newSidebarContain'>
                    <div className='outlineContain'>
                        <div className='newTOP'>
                            <h1>Edit user</h1>
                        </div>
                         <div className='newBottom'>
                            <div className='imageOptions'>
                                <img src={images ? URL.createObjectURL(images) : "/images/work.png"}  alt=''/>
                            </div>
                            <div className='inputOptionss'>
                              <div className='optOptions'>
                                <h1>Image: </h1>
                                <input type='file'  onChange={(e)=>setImages(e.target.files[0])} id='image'  />
                              </div>
                              <div className='optOptions'>
                                <p>Username</p>
                                <input type='text' onChange={(e)=>setUserName(e.target.value)} placeholder='Enter name'  />
                              </div>
                              <div className='optOptions'>
                                <p>Email</p>
                                <input type='email' onChange={(e)=>setEmail(e.target.value)} placeholder='Enter email'  />
                              </div>
                              <div className='optOptions'>
                                <p>Phonenumber</p>
                                <input type='number' onChange={(e)=>setPhonenumber(e.target.value)} placeholder='Enter phonenumber'  />
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
export default NewUserContainer