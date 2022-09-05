import React, {useState} from 'react'
import './NewContainer.css'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import axios from 'axios'
import {axiosInstance} from "../Utils/Utils"
import {DriveFolderUploadOutlinedIcon} from '@mui/icons-material'


function NewContainer(){
    const [image, setImage] = useState('')
    const[username, setUserName]= useState('')
    const[success, setSuccess] = useState(false)
    const[email, setEmail] =useState('')
    const [password, setPassword] = useState('')
    const [phonenumber, setPhoneNumber] =useState('')
    // const details = {username, email, password, phonenumber}
    const handleSubmitt = async(e) =>{
      e.preventDefault()
      const datas = new FormData()
      datas.append("file", image)
      datas.append("upload_preset","wandia")
      // datas.append("cloud_name" , "wandia")
      try{
        const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/wandia/image/upload", datas)
        const URL = uploadRes.data.url
        // const newUser = {details: details, img:URL} 
        await axiosInstance.post("/userr/registers", {username: username, img: URL, password: password, phonenumber: phonenumber,email: email})
        setSuccess(true)
        // console.log(URL)
        
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
                            <h1>Add New user</h1>
                        </div>
                         <div className='newBottom'>
                            <div className='imageOptions'>
                                <img src={image ? URL.createObjectURL(image) : '/images/work.png'}  alt=''/>
                            </div>
                            <div className='inputOptionss'>
                              <div className='optOptions'>
                                <h1>Image: </h1>
                                <input type='file' onChange={(e)=>setImage(e.target.files[0])} id='image'  />
                              </div>
                              <div className='optOptions'>
                                <p>Name</p>
                                <input type='text' onChange={(e)=>setUserName(e.target.value)} placeholder='Enter name'  />
                              </div>
                              <div className='optOptions'>
                                <p>Phone</p>
                                <input type='number' onChange={(e)=>setPhoneNumber(e.target.value)} placeholder='+254742845204'  />
                              </div>
                              <div className='optOptions'>
                                <p>Email</p>
                                <input type='email' onChange={(e)=>setEmail(e.target.value)} placeholder='Enter email'  />
                              </div>
                              <div className='optOptions'>
                                <p>Password</p>
                                <input type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Enter password'  />
                              </div>
                            </div>
                        </div>
                        {success && "user updated"}
                      
                        <button className='ooptButtons' onClick={handleSubmitt}>Send</button>

                    </div>
                </div>

            </div>
        </div>
    )
}
export default NewContainer