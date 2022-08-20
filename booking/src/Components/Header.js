import { Bed, DeliveryDining, DinnerDining } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
function Header() {
  return (
    <div className='header'>
        <div className='hContainer'>
            <div  className='hIcon'>
                <Link to='/bed'>
                <div className='hIcons'>
                    <Bed sx={{
                     width: "38px !important",
                     height: "38px !important",
                     marginLeft: "18px !important",
                    
                    }}
                      /><p>Stays</p>
                </div>
                </Link>
                <div className='hIcons'>
                    <DinnerDining sx={{width: "38px !important", color: "darkgray", height: "38px !important",marginLeft: "18px !important"}}/><p>Cafe</p>
                </div>
                <Link to='/delivery'>                
                     <div className='hIcons'>
                    <DeliveryDining sx={{width: "38px !important",height: "38px !important",marginLeft: "18px !important"}}/><p>Delivery</p>
                    </div>
                </Link>
            </div>
            <div className='hDescription'>
               <h2> We serve quality Food and drinks at affordable price!!!!</h2>
            </div>
            <div className='hParagraph'>
                <h2>Five days customers, enjoy 20% discount on accommodation</h2>
            </div>
        </div>
    </div>
  )
}

export default Header