import React, {useState,useEffect} from 'react'
import Navbar from './Navbar'
import './Delivery.css'
import {axiosInstance} from "../Utils/Utils"
import { useNavigate,Link } from 'react-router-dom'
import {Telegram, WhatsApp} from '@mui/icons-material'
// const data = [
//     { 
//     image1: '/images/taxi1.jpg',
//     name: "Michael Saylor",
//     image2: "/images/person1.jpg",
//     phonenumber: 254745322228,
//     city:"London"
//     } ,{ 
//         image1: '/images/taxi2.jpg',
//         name: "Kelvin Smith",
//         image2: "/images/person3.jpg",
//         phonenumber: 254765377221,
//         city:"Sweden"
//         }
//         ,{ 
//             image1: '/images/taxi3.jpg',
//             name: "Michael Salam",
//             image2: "/images/person4.jpg",
//             phonenumber: 254746578909,
//             city:"Nairobi"
//             }
//             ,{ 
//                 image1: '/images/taxi4.jpg',
//                 name: "Ruth Turr",
//                 image2: "/images/person5.jpg",
//                 phonenumber: 2547453567848,
//                 city:"Thika"
//                 }
//                 ,{ 
//                     image1: '/images/taxi5.jpg',
//                     name: "Elon Musk",
//                     image2: "/images/person5.jpg",
//                     phonenumber: 254745463789,
//                     city:"Switzerland"
//                     }
//                     ,{ 
//                         image1: '/images/taxi6.jpg',
//                         name: "Betty Ruty",
//                         image2: "/images/person3.jpg",
//                         phonenumber: 254794789528,
//                         city:"Cairo"
//                         }
//    
                //  ]
function Delivery(){
    const[data, setData] = useState([])
    const [ timer, setTimer] = useState(false)
    // const value = window.scrollY
    // useEffect(()=>{
    //     if(values >=100){
    //         setTimer(true)
    //     }else{
    //         setTimer(false)
    //     }
    // },[])
    const URL = "/deliverys/finds"
    const fetchData = async(URL) =>{
        try{
            const res = await axiosInstance.get(URL)
            setData(res.data)
        }catch(err){
            console.log(err)
        }
    }
    fetchData(URL)
    // console.log(value)
    const navigate = useNavigate()
    const handleClick = (e) =>{
        e.preventDefault()
      

    }
    return (
        <div className='delivery'>
            <Navbar />
        
        <div className='deliveryContainer'>
            <div className={timer ? "deliveryHeaders deliveryHeader"  : "deliveryHeader"}>
                <p> Book your favorite ride</p>
            </div>
            <div className='deliveryBody'>
                <div className='bodyConttainer'>
                    {data?.map((item)=>{
                        return <div className='deilverBox' key={item._id}>
                            <img className="mainImage" src={item?.photos[1]} alt='' />
                            <div className='deliverImage'>
                                <img className="avatarImage" src={item?.photos[0]} alt='' />

                                <p>{item.name}</p>
                            </div>
                            <div>
                                <p className='phonenumbers'><span>Phone:</span> {item.phonenumber}</p>
                            </div>
                            <div>
                                <p className='cities'><span>City:</span> {item.city}</p>
                            </div>
                            <Link to={`/view/map/${item._id}`}>
                                <div>
                                    <p className='cities' style={{color: "red",fontSize: 17,cursor:"pointer"}}><span>Location:</span>Track my Location...</p>
                                </div>
                            </Link>
                            <a href={`tel:${item.phonenumber} `}><button onClick={handleClick}>Call Now</button></a>
                            </div>
                    })}
                </div>
            </div>
            <div className='deliveryFooter'>
                <div className='footerHeader'>
                    <h1>Chat customer service live on social network</h1>
                </div>
                <div className='footerNetworkss'>
                    <a href='https://t.me/xcrxwadda'>
                        <div className='footerNetworks'>
                            <Telegram sx={{ width: 80,height: 80,color: "rgb(90, 90, 233)",}}/>
                            <p>Telegram</p>
                        </div>
                    </a>
                    <a href="https://wa.me/254794770857?text=Welcome%20to%20booking%20app....">
                        <div className='footerNetworks'>
                            <WhatsApp sx={{ width: 80,height: 80,color: "rgb(76, 228, 76)",}}/>
                            <p style={{color:"rgb(76, 228, 76)"}}>Whatsapp</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>

        </div>
    )
}

export default Delivery