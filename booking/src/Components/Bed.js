import React from 'react'
import { Autoplay, EffectFade, Navigation,Pagination } from 'swiper'
import { Swiper,SwiperSlide } from 'swiper/react/swiper-react'
import "swiper/swiper.min.css"
import  "swiper/modules/pagination/pagination.min.css"
import  "swiper/modules/autoplay/autoplay.min.css"
import  "swiper/modules/navigation/navigation.min.css"
import  "swiper/modules/effect-fade/effect-fade.min.css"



import './Bed.css'
const dummyData =[{
  vida: "/images/video.mp4"
},
{
  vida: "/images/video5.mp4"
},
{
  vida: "/images/video6.mp4"
}
]
function Bed() {

  return (
    <div className='bBed'>
      <div className='bedVida'>
      <div  className='bedVideoss'>
        <Swiper
          modules={[Pagination,Navigation,Autoplay,EffectFade]}
          pagination={{ clickable: false }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
          navigation
          effect='fade'
          slidesPerView={1}
          loop
          autoplay={{
            delay: 5000,
            pauseOnMouseEnter: false
          }}
        >
  {dummyData.map((dummy,i)=>{
   return <SwiperSlide className='ssLider'>
  <video muted loop autoPlay key={i}  src={dummy.vida} type='video/mp4' className='bedVideo' />
   </SwiperSlide>
})}
 
  </Swiper>
    </div>
      </div>
        <div className='bedContainer'>
          <div className='bedContainers'>
        
            <div  className='hheader'>
              <h1>Our Hotels</h1>
            </div>
              <ul>
                  <li>
                    <a href='https://mixkit.co/free-stock-video/hotel-room/'>
                    About
                    </a>
                    </li>
                  <li> 
                    <a href='https://mixkit.co/free-stock-video/restaurant/'>
                    Availability
                    </a>
                    </li>
              </ul>
            </div>
            <div className='bedDesc'>
                <p>
                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renais
                </p>
            </div>
        </div>
    </div>
  )
}

export default Bed