import React from 'react'
import {  Pagination, Scrollbar, A11y, Autoplay,   EffectFade, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax'

import { useSpring, animated as a } from 'react-spring'
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/scrollbar/scrollbar.min.css';
import 'swiper/modules/autoplay/autoplay.min.css';
import 'swiper/modules/effect-fade/effect-fade.min.css';
import 'swiper/modules/navigation/navigation.min.css';






function Slider() {
// const props = useSpring({
  // to:{marginTop: "500px",opacity:1},
  // from:{marginTop:"-100px", opacity: 0},
  // config:{ mass:1, tension: 150,velocity: 3,friction: 20}
  const props = useSpring({ to: { opacity: 1,rotate:"90deg" }, from: { opacity: 0 } , config:{ mass: 10, friction: 29}})
// })
  return (
    <div>
    <div>
       <Swiper
       className='swperSlide'
      // install Swiper modules
      modules={[Autoplay,Navigation,EffectFade, Pagination, Scrollbar, A11y]}
      slidesPerView={1}
      loop
      autoplay={{
        delay: 3300,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      }}
      effect='fade'
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide>
        <div className='swiperContainer'>
          <img src="/images/drinks.jpg" alt='' />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className='swiperContainer'>
          <img src="/images/login.jpg" alt='' />
        </div>
      </SwiperSlide> <SwiperSlide>
        <div className='swiperContainer'>
          <img src="/images/waiter.jpg" alt='' />
        </div>
      </SwiperSlide>
     
    </Swiper>
      </div>
      {/* <a.div 
       className='swperSlide'
       style={{props}}>
        <img src='/images/waiter.jpg' alt='' />
      </a.div> */}
      <div>
        <Parallax pages={2} style={{ top: '0', left: '0' }}>
  <ParallaxLayer
    offset={0}
    speed={2.5}
    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <p>Scroll down</p>
  </ParallaxLayer>

  <ParallaxLayer offset={1} speed={2} style={{ backgroundColor: '#ff6d6d' }} />

  <ParallaxLayer
    offset={1}
    speed={0.5}
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
    }}>
    <p>Scroll up</p>
  </ParallaxLayer>
</Parallax>
      </div>
  </div>
  )
}

export default Slider