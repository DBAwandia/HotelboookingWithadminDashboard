import React, {useState} from 'react'
import './NewRoom.css'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import {DriveFolderUploadOutlinedIcon} from '@mui/icons-material'


function NewRoom(){
    const [files, setFiles] = useState('')
    const [maxpeople, setMaxpeople] = useState('')
    const[name, setName]= useState('')
    const[price, setPrice] =useState('')
    const [title, setTitle] = useState('')
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
                                <img src={files ? URL.createObjectURL(files) : '/images/work.png'}  alt=''/>
                            </div>
                            <div className='inputOptionss'>
                              <div className='optOptions'>
                                <h1>Image: </h1>
                                <input type='file' onChange={(e)=>setFiles(e.target.files[0])} id='files'  />
                              </div>
                              <div className='optOptions'>
                                <p>Name</p>
                                <input type='text' onChange={(e)=>setName(e.target.value)} placeholder='Enter name'  />
                              </div>
                              <div className='optOptions'>
                                <p>Title</p>
                                <input type='text' onChange={(e)=>setTitle(e.target.value)} placeholder='Edit title'  />
                              </div>
                              <div className='optOptions'>
                                <p>Max People</p>
                                <input type='number' onChange={(e)=>setMaxpeople(e.target.value)} placeholder='Enter number of people'  />
                              </div>
                              <div className='optOptions'>
                                <p>Price</p>
                                <input type='number' onChange={(e)=>setPrice(e.target.value)} placeholder='Enter price'  />
                              </div>
                            </div>
                        </div>
                        <button className='ooptButtons'>Send</button>

                    </div>
                </div>

            </div>
        </div>
    )
}
export default NewRoom