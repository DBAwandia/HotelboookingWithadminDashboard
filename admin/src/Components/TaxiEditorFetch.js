import React, {useEffect,useState} from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import axios from 'axios'
import {axiosInstance} from "../Utils/Utils"

// import './TaxiEditorFetch.css'
function TaxiEditorFetch(){
    const [files, setFiles] = useState("")
    const [name, setName] = useState("")
    const [city, setCity] = useState("")
    const [success, setSuccess] = useState(false)
    const [phonenumber, setPhonenumber] = useState("")
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
            await axiosInstance.post("/deliverys/savedatas",{ name: name,phonenumber: phonenumber,city: city, photos: list})
            setSuccess(true)
        }catch(err){
            console.log(err)
        }

    }
    return(
        <div className='taxiEditorfetchx'>
            <div className='taxiEditorfetchsx'>
                <Navbar />
            </div>
            <div className='taxiEditorfetchssx'>
                <div className='taxiEditorfetchsssx'>
                    <Sidebar />
                </div>
                <div className='taxiEditorfetchssssx'>
                    <div className='imageEditorzx'>
                        <div className='imageEditotz2x'>
                            <h1>Add new drivers and cars</h1>
                        </div>
                        <div className='imageEditotz3x'>
                            <div className='imageEditotz4x'>
                                <img className='imageEditotz44' src={files ? URL.createObjectURL(files[1]) : "/images/work.png" } alt='' />
                            </div>
                            <div className='imageEditotz5x'>
                                <div className='imageEditotz6x'>
                                    <input type='text' placeholder='Enter name'  onChange={e=>setName(e.target.value)} />
                                </div>
                                <div className='imageEditotz6x'>
                                    <input type='text'  onChange={e=>setCity(e.target.value)} placeholder='Enter city' />
                                </div>
                                <div className='imageEditotz6x'>
                                    <input type='file' multiple placeholder='Enter both car and driver Avatar' onChange={e=>setFiles(e.target.files)} />
                                </div>
                               
                                <div className='imageEditotz6x'>
                                    <input type='number' placeholder='Enter phonenumber' onChange={e=>setPhonenumber(e.target.value)}/>
                                </div>
                                 <div className='imageEditotz66'>
                                {success && "successfully updated!!"}

                                </div>
                                <div className='imageEditotz6x'>
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

export default TaxiEditorFetch