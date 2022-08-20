import React, {useState} from 'react'
import './NewContainer.css'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Charts from './Charts'
import Tables from './Tables'
import {DriveFolderUploadOutlinedIcon} from '@mui/icons-material'


function NewProduct(){
    const [files, setFiles] = useState('')
    const[name, setName]= useState('')
    const[email, setEmail] =useState('')
    const [password, setPassword] = useState('')
    const [numbers, setNumbers] =useState('')
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
                            <h1>Add New products</h1>
                        </div>
                         <div className='newBottom'>
                            <div className='imageOptions'>
                                <img src={files ? URL.createObjectURL(files): "/images/work.png"}  alt=''/>
                            </div>
                            <div className='inputOptionss'>
                              <div className='optOptions'>
                                <h1>Image: </h1>
                                <input type='file' onChange={(e)=>setFiles(e.target.value[0])} id='file'  />
                              </div>
                              <div className='optOptions'>
                                <p>Name</p>
                                <input type='text' onChange={(e)=>setName(e.target.value)} placeholder='Enter name'  />
                              </div>
                              <div className='optOptions'>
                                <p>Phone</p>
                                <input type='number' onChange={(e)=>setNumbers(e.target.value)} placeholder='+254742845204'  />
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
                        <button className='ooptButtons'>Send</button>

                    </div>
                </div>

            </div>
        </div>
    )
}
export default NewProduct