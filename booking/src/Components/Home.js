import Navbar from './Navbar'
import SearchContainer from './SearchContainer'
// import MailList from './MailList'
import React from 'react'
import HotelApartments from './HotelApartments'
import RatingPhoto from './RatingPhoto'

function Home() {
  return (
    <div className='home'>  
      <Navbar/>
      <div className='iContainer'>
        <SearchContainer/>
       <div className='inputPhotos'>
          <HotelApartments/>
        </div>
      </div>
      <div className='pContainer'>
        <RatingPhoto />
      </div>
      
   
    </div>
  )
}

export default Home