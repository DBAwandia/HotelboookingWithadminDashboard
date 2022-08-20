import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Analytics from './Analytics'
import './Homes.css'
function Homes() {
  return (
    <div className='adminHome'>
      <Navbar />
      <div className='adminContainer'>
        <div className='sideContainer'>
          <Sidebar />
        </div>
        <div className='sideContainers'>
          <Analytics />
        </div>
      </div>
    </div>
  )
}

export default Homes