import React, { useState,useEffect,useContext } from 'react'
import Navbar from './Navbar'
import './ExactHotel.css'
import { LocationCity} from '@mui/icons-material'
import{ LoginContext }from "../Context/LoginContext"
import ShdowImage from './ShdowImage'
import useFetch from '../Hooks/useFetch'
import {CircularProgress } from '@mui/material'
import {useNavigate, useParams, useLocation} from 'react-router-dom'
import { SearchContext } from '../Context/SearchContext'
import Room from './Room'
const photos = [
  {
  imge: "/images/drinks.jpg"
  },
  {
    imge: "/images/red.webp"
  },
  {
    imge: "/images/waiter.jpg"
  },
  {
    imge: "/images/drinks.jpg"
  },
  {
    imge: "/images/red.webp"
  },
  {
    imge: "/images/waiter.jpg"
  }]
function ExactHotel() {
const [ level, setLevel ] =useState(0)
const [openApp, setOpenApp ] = useState(false)
useEffect(()=>{
  const timer = setInterval(()=>{
      setLevel((newTimer)=> newTimer >= 100 ? 0 : newTimer + 10)
  },500)

  return ()=>{
    clearInterval(timer)
  }
},[])
const { user } =useContext(LoginContext)
const location = useLocation()
// const params = useParams()
const navigate = useNavigate()

// const {data}=useFetch(`http://localhost:5000/hotel/hotel/${params.hotelid}`)

const[openImage, setOpenImage ] = useState(false)
const id = location.pathname.split("/")[1]
const {data}=useFetch(`http://localhost:5000/hotel/hotel/${id}`)

const datas = [data]
const handleReserve =() =>{
  if(user){
    setOpenApp(!openApp)
  }
  else{
    navigate("/login")
  }
}
const { options,date } = useContext(SearchContext)

const MILLI_SEC_PER_DAY = 1000 * 60 * 60 * 24 ;
function dayDifference( date1 , date2){
  const timeDiff = Math.abs( date2?.getTime() -   date1?.getTime())
  const diffDays = Math.ceil(timeDiff / MILLI_SEC_PER_DAY)
  return diffDays;
}
const days = dayDifference(  date[0]?.endDate,   date[0]?.startDate)
   return (
    <div className='ExactHotel'>
      <div className='headNavbarz'>
      <Navbar/>
      
      </div>
     <div className='exactContainer' >
          <div className='exactBody'>
            <div className='exactDisplay'>

              <div className='exactHeading'>
                <div className='headerDescription'>
                  <h1 className='header1'>Tower Street Apartments</h1>

                  <div className='headerIcons'>
                    <LocationCity className='headIcon' sx={{ color:"red",width: "30px",height:"30px",
                      fontSize: 25}}/>
                    <p>Elton St 125 New York</p>
                  </div>
                  <h2 className='header2'>Book more than $120 and stay for 1Day extra</h2>
                </div>
                <div className='headerButtonz'>
                  <button onClick={()=>setOpenApp(true)}>Reserve or Book Now</button>
                </div>
              </div>
              <div className='exactPhotos'>
                <div className='exactPhoto' >
                            <div className='photoContainer'>
                              { data?.photos?.map((item,i)=>{
                               return <img className='imagges' onClick={()=>setOpenImage(!openImage)} key={i}  src={item} alt='' />
                          })}
                            </div>
                            <b>Click the image to see more...<CircularProgress value={level} sx={{ width: 20, height: 20, marginLeft: 15}}/></b>
                            {openApp && <div className='opensRoom'>
                              <Room setOpenApp={setOpenApp} days={days} options={options} hotelID={id}/>
                            </div>}
                                  </div>
               
              </div> 
             {openImage && <div className='shdowImage'>
                {datas?.map( item =><ShdowImage item={item._id}  setOpenImage={setOpenImage} />)}
              </div>}
              {datas?.map((items,i)=>(
               <div className='exactFooter' key={i}>

                <div className='fFoooter' >
                      <div className='footerHeaderz'>
                        <h1>{items.title}</h1>
                      <p>
                        {items.desc}
                        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
                      </p>
                    </div>
                    <div className='footerPayment'>
                      <div className='paraglaph'>
                      <h1 className='paraglaphs'>Perfect for a {days}-Night sleep</h1>
                      <p>Keep pushing, you will find obstacles on the way but never give up!!!!!boy</p>
                      </div>
                      <div className='h2Pay'>
                        <h2> ${days*items.cheapestPrice*options.room }</h2><p>({days} Nights)</p>
                      </div>
                      <button className='foooterButton' onClick={handleReserve}>Reserve or Book Now</button>
                    </div>
                    
                  </div> 
               
              </div>
              ))}
            </div>
          </div>
      </div>
    </div>
  )
}

export default ExactHotel 