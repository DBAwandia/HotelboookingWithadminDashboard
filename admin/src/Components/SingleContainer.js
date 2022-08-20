import React, {useState} from 'react'
import './SingleContainer.css'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Charts from './Charts'
import Tables from './Tables'
import {Link} from 'react-router-dom'


function SingleContainer(){
    return(
        <div className='single'>
            <Navbar/>
            <div className='singleContainer'>
                <div className='singleSidebar'>
                    <Sidebar/>
                </div>
                <div className='singleSidebarContain'>
                    <div className='left'>
                        <h1>Information</h1>
                        <div className='item'>
                            <img src='/images/work.png' alt='' />
                           <div className=' details'>
                            <h1>John Doe</h1>
                            <p>Email: john@gmail.com</p>
                            <p>Phone: +254745678990</p>
                            <p>Country: Kenya</p>
                           </div>
                        </div>
                        <Link style={{textDecoration: "none"}}  to ='/users/new'>
                        <div className='editButton'>

                            Edit
                        </div>

                        </Link>
                    </div>
                    <div className='right'>
                        <Charts title='Users expenditure'/>
                    </div>
                    <div className='bottom'>
                        <Tables />
                    </div>
                </div>

            </div>
        </div>
    )
}
export default SingleContainer