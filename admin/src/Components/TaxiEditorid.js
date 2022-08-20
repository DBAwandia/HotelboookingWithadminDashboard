import React, {useEffect,useState} from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import axios from 'axios'
import {useLocation} from 'react-router-dom'
import './TaxiEditorFetch.css'

function TaxiEditorid(){
    const [files, setFiles] = useState("")
    const [name, setName] = useState("")
    const [city, setCity] = useState("")
    const [success, setSuccess] = useState(false)
    const [phonenumber, setPhonenumber] = useState("")
    const location = useLocation()
    const ids = location.pathname.split("/")[2]
    console.log(ids)
    // const datas =( )
    const handleSend =async()=>{
        
        try{
            const list = await Promise.all(Object.values(files).map(async(image)=>{
                const data = new FormData()
                data.append("file", image)
                data.append("upload_preset", "wandia")
                const res = await axios.post("https://api.cloudinary.com/v1_1/wandia/image/upload", data)
                const URL = res.data.url
                return URL

            }))
            await axios.put(`/api/deliverys/finds/${ids}`,{ name: name,phonenumber: phonenumber,city: city, photos: list})
            setSuccess(true)
        }catch(err){
            console.log(err)
        }

    }
    return(
        <div className='taxiEditorfetch'>
            <div className='taxiEditorfetchs'>
                <Navbar />
            </div>
            <div className='taxiEditorfetchss'>
                <div className='taxiEditorfetchsss'>
                    <Sidebar />
                </div>
                <div className='taxiEditorfetchssss'>
                    <div className='imageEditorz'>
                        <div className='imageEditotz2'>
                            <h1>Add new drivers and cars</h1>
                        </div>
                        <div className='imageEditotz3'>
                            <div className='imageEditotz4'>
                                <img className='imageEditotz44' src={files ? URL.createObjectURL(files[1]) : "/images/work.png" } alt='' />
                            </div>
                            <div className='imageEditotz5'>
                                <div className='imageEditotz6'>
                                    <input type='text' placeholder='Enter name'  onChange={e=>setName(e.target.value)} />
                                </div>
                                <div className='imageEditotz6'>
                                    <input type='text'  onChange={e=>setCity(e.target.value)} placeholder='Enter city' />
                                </div>
                                <div className='imageEditotz6'>
                                    <input type='file' multiple placeholder='Enter both car and driver Avatar' onChange={e=>setFiles(e.target.files)} />
                                </div>
                               
                                <div className='imageEditotz6'>
                                    <input type='number' placeholder='Enter phonenumber' onChange={e=>setPhonenumber(e.target.value)}/>
                                </div>
                                 <div className='imageEditotz66'>
                                {success && "successfully updated!!"}

                                </div>
                                <div className='imageEditotz6'>
                                    <button onClick={handleSend}>Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaxiEditorid