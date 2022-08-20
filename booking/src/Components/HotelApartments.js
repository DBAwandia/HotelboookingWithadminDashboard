import React, { useState } from 'react'
import useFetch from '../Hooks/useFetch'
import './HotelApartment.css'
// const photos =[
//     {
//         image:"/images/drinks.jpg",
//         title: "Hotel",
//         desc: "20 Hotels"

//     },
//     {
//         image: "/images/waiter.jpg",
//         title: "Food Drinks",
//         desc: "20 Hotels"
//     },
//     {
//         image: "/images/red.webp",
//         title: "Accomodation",
//         desc: "20 Hotels"
//     }
// ]

import { Swiper,SwiperSlide} from "swiper/react/swiper-react"
import { Autoplay} from "swiper"
import 'swiper/swiper.min.css'
import 'swiper/modules/autoplay/autoplay.min.css'


function HotelApartments() {
    const [show,setShow] = useState(false)
    const handleShow =()=>{
        setShow(!show)
    }
    const {data,loading} = useFetch("http://localhost:5000/hotel/countByName")

  return (
    <Swiper
    className=' .imgSlder'
    modules={[Autoplay]}
    loop
    spaceBetween={20}
    slidesPerView={3}
    onSlideChange={() => console.log('slide change')}
    onSwiper={(swiper) => console.log(swiper)}
    autoplay={{
      delay: 2800,
      pauseOnMouseEnter: false,
      disableOnInteraction: false
    }}
  >
    <div className='hApartment'>
   
            <div className='himageContainer'>
 
          
                   {data.map((photo,i)=>{
                 
                      return  <div key={i}>
                      
                       
                          
                   <SwiperSlide className='imgSlder' >
                      <div className='imagess' key={i}> 
                                 <img className='images' src='https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' alt='' />
                                <p style={{opacity: "0.1",background:"transparent"}}>'</p>
                                <p style={{opacity: "0.1",background:"transparent"}}>'</p>
                                <p style={{opacity: "0.1",background:"transparent"}}>'</p>

                          </div> 
                          <div className='hDescriptiion'>
                                 <h1>{photo.name}</h1>
                                 <p>{photo.count} {photo.name}</p>
                             </div>
                  </SwiperSlide>
                  <SwiperSlide className='imgSlder' >
                      <div className='imagess' key={i}> 
                                 <img className='images' src='https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80' alt='' />
                                <p style={{opacity: "0.1",background:"transparent"}}>'</p>
                                <p style={{opacity: "0.1",background:"transparent"}}>'</p>
                                <p style={{opacity: "0.1",background:"transparent"}}>'</p>

                          </div> 
                          <div className='hDescriptiion'>
                                 <h1>{photo.name}</h1>
                                 <p>{photo.count} {photo.name}</p>
                             </div>
                  </SwiperSlide>
                  <SwiperSlide className='imgSlder' >
                      <div className='imagess' key={i}> 
                                 <img className='images' src='https://images.unsplash.com/photo-1562790351-d273a961e0e9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80
                                  ' alt='' />
                                <p style={{opacity: "0.1",background:"transparent"}}>'</p>
                                <p style={{opacity: "0.1",background:"transparent"}}>'</p>
                                <p style={{opacity: "0.1",background:"transparent"}}>'</p>

                          </div> 
                          <div className='hDescriptiion'>
                                 <h1>{photo.name}</h1>
                                 <p>{photo.count} {photo.name}</p>
                             </div>
                  </SwiperSlide>
                 
                      </div>
                       
                  })}

                             
                            
 
                    </div>

        </div>


   </Swiper>
  

  )
}

export default HotelApartments