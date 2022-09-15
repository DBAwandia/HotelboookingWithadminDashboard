import React from 'react'
import "./ShadowImage.css"
import {CancelOutlined} from '@mui/icons-material'
import { Swiper,SwiperSlide } from 'swiper/react/swiper-react'
import { Pagination, Navigation, Autoplay,Scrollbar } from 'swiper'
import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'
import 'swiper/modules/autoplay/autoplay.min.css'
import 'swiper/modules/scrollbar/scrollbar.min.css'
import useFetch from '../Hooks/useFetch'

// const photos = [
//   {
//   imge: "/images/drinks.jpg"
//   },
//   {
//     imge: "/images/red.webp"
//   },
//   {
//     imge: "/images/waiter.jpg"
//   }]

function ShdowImage({setOpenImage,item}) {
  const id = item
  const {data}=useFetch(`/hotel/hotel/${id}`)

  const datas= [data]

  return (
    <Swiper
        modules={[Pagination,Navigation,Autoplay,Scrollbar]}
        pagination={{clickable: true}}
        navigation
        loop
        autoplay={{
          delay: 5000,
        }}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
    >
    <div className='imageShadow'>
         <div className='imageShadows'>
         {data?.photos?.map((items)=>{
                  return  <div className='shadoImage' key={items}>
                                <div className='contentImage'>
                                    <SwiperSlide className='shadowSlider'>
                                        <CancelOutlined onClick={()=>setOpenImage(false)} className='hadoowIcon' sx={{position: "absolute",cursor: "pointer",  width: 50, height: 50}}/>
                                        <img  className='shadoImagges' src={items} alt='' />
                                    </SwiperSlide>
                                </div>

                 </div>
                })}
         </div>      
    </div>
    </Swiper>
  )
}

export default ShdowImage