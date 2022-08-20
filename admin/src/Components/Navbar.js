import { LanguageOutlined, NotificationsOutlined, SettingsOutlined } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import React from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'
function Navbar() {
  return (
    <div className='admNavbar'>
      <div className='navContainer'>
        <Link style={{textDecoration: "none"}}  to ='/'>
        <h1>Admins </h1>
        </Link>
        <div className='admIcons'>
          <div className='admNotification'>
            <NotificationsOutlined sx={{fontSize: 45}}/>
            <span>434</span>
          </div>
          <div className='admNotification'>
            <LanguageOutlined sx={{fontSize: 45}}/>
            <span>322</span>
          </div>
          <div className='admNotification' >
            <SettingsOutlined sx={{fontSize: 45}}/>
          </div>
          <Avatar src='/images/work.png' sx={{fontSize: 60}} />
        </div>
      </div>

    </div>
  )
}

export default Navbar