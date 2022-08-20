import React from 'react'
import {HomeOutlined,
        PersonOutlined,
        Report,
        BarChartOutlined,
        ForumOutlined,
        LocalPostOfficeOutlined,
        MonetizationOutlined,
        Inventory2Outlined
        ,EqualizerOutlined} from '@mui/icons-material'
import {Link} from 'react-router-dom'
import './Sidebar.css'
function Sidebar() {
  return (
    <div className='admSidebar'>
      <div className='sideBarContainer'>
        <div className='sideDashboard'>
          <p>Dashboard</p>
          <Link to='/'>
           <div className='iconsDisplay'>
            <HomeOutlined sx={{fontSize: 37, color: "teal"}}/>
            <h2>Home</h2>
           </div>
           </Link>
           <div className='iconsDisplay'>
            <EqualizerOutlined sx={{fontSize: 37}}/>
            <h2>Analytics</h2>
           </div>
           <div className='iconsDisplay'>
           <BarChartOutlined sx={{fontSize: 37, color: "lightgray"}}/>
            <h2>Sales</h2>
           </div>
        </div>
        <div className='sideDashboard'>
          <p> Quick Menu</p>
          <Link style={{textDecoration: "none"}}  to ='/users'>
              <div className='iconsDisplay'>
              <PersonOutlined sx={{fontSize: 37,color: "teal"}}/>
              <h2>Users</h2>
            </div>
           </Link>

           <Link to='/hotel'>
            <div className='iconsDisplay'>
              
              <Inventory2Outlined sx={{fontSize: 37,color: "teal"}}/>
              <h2>Hotels</h2>
            </div>
           </Link>
           <Link to='/delivery'>
            <div className='iconsDisplay'>
              
              <Inventory2Outlined sx={{fontSize: 37,color: "teal"}}/>
              <h2>Delivery & Driving</h2>
            </div>
           </Link>
           <div className='iconsDisplay'>
            {/* <MonetizationOutlined /> */}
            <h2>Transactions</h2>
           </div>
           <Link to='/room'>
           <div className='iconsDisplay'>
            <BarChartOutlined sx={{fontSize: 37}}/>
            <h2>Rooms</h2>
           </div>
           </Link>
          </div>
          <div className='sideDashboard'>
            <p>Notifications</p>
              <div className='iconsDisplay'>
                <LocalPostOfficeOutlined sx={{fontSize: 37}}/>
                <h2>Mail</h2>
              </div>
            
              <div className='iconsDisplay'>
                <ForumOutlined sx={{fontSize: 37}}/>
                <h2>Messages</h2>
               </div>
              </div>
          <div className='sideDashboard'>
              <p>Staff</p>
              <div className='iconsDisplay'>
                <Report sx={{fontSize: 37, color: "red"}}/>
                <h2>Reports</h2>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Sidebar