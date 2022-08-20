import React, {useState,useEffect} from 'react'
import './Mapbox.css'
import {Room} from '@mui/icons-material'
import {Link } from 'react-router-dom'
import Map,{Marker,GeolocateControl} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import Navbar from './Navbar'
function Mapbox(){
    const[show, setShow] = useState(true)
   
    return(
        <div>
            <Navbar/>
        <div className='mapbox'>
               <div className='mabboxChange'>
                    <h1>CHECK YOUR LOCATION</h1>
                    <p>Price is calculated according to 
                        distance travelled!!
                    </p>
                    <span>Safe journey...</span>
                    <Link to='/delivery'>
                    <h2 style={{color: "orange",
                    cursor: "pointer",
                    fontSize: 16,fontWeight: 400}}>BACK TO TAXIS</h2>
                    </Link>
               </div>
               <div className='mapboxView'>
               <Map
                    initialViewState={{  
                        zoom: 2}}
                    style={{width: '70', height: '70vh'}}
                    mapStyle="mapbox://styles/kennedy12/cl6ghd9nb001v14ns280blivn"
                    mapboxAccessToken="pk.eyJ1Ijoia2VubmVkeTEyIiwiYSI6ImNsNmc4NG5xNTA5dWwzY282eDdwb3BtdHoifQ.JxIg4AME_A0LprkaiIJ_zw"
                    onViewportChange='true'
                > 
                 <GeolocateControl 
                    trackUserLocation="true"
                    showUserHeading='true'
                    className='geolocator'
                 />
                </Map>
               </div>
        </div>
     </div>
    )
}

export default Mapbox