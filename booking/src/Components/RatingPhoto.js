import React, { useState,useRef } from 'react'
import './RatingPhoto.css'
import {Bounce} from 'react-reveal';
import emailjs from '@emailjs/browser';
import { useNavigate} from 'react-router-dom'
import useFetch from '../Hooks/useFetch'
// const photos =[
//     {
//         image: "/images/red.webp",
//         city: "Madrid",
//         price: "starting from $120",
//         rating: "7.3",
//         type: "Excellent"

//     },
//     {
//         image: "/images/red.webp",
//         city: "Madrid",
//         price: "starting from $120",
//         rating: "2.3",
//         type: "Poor"

//     }, {
//         image: "/images/red.webp",
//         city: "Madrid",
//         price: "starting from $120",
//         rating: "5.3",
//         type: "good"

//     },
//     {
//         image: "/images/red.webp",
//         city: "Austria",
//         price: "starting from $120",
//         rating: "4.3",
//         type: "Good"
//     },
//     {
//         image: "/images/red.webp",
//         city: "Turkey",
//         price: "starting from $120",
//         rating: "7.3",
//         type: "Excellent"
//     }
// ]
function RatingPhoto() {
    const [open,setOpen] = useState(false)
    const form = useRef();
    const navigate = useNavigate()
    const { data, loading} = useFetch("/hotel/finds")
    const sendEmail = (e)=>{
        e.preventDefault()
        emailjs.sendForm('fluid_brakes', 'template_wl4hdrp', form.current, 'Ru9-B2y3vQ64gc1wa')
      .then((result) => {
          console.log(result.text);
          setOpen(true)
          navigate("/")
      }, (error) => {
          console.log(error.text);
      });

    }
  return (
    <div className='rRating'>
       {loading ? ("LOADING") :  (
        <div className='rContainer'>
                 {data.map((item)=>{
                return <div key={item._id} className="bConiner">
                    <img src={item.photos[0]} alt=''className='rImages'/>
                    <div className='rDescription'>
                        <h1>{item.city}</h1>
                        <p>Starting from {item.cheapestPrice}</p>
                    <div className='rDesc'>
                        <p className='ratings'>{item.rating}</p>
                        <p  className='ratingss'>{item.type}</p>
                    </div>

                    </div>
                </div>
            })}
        </div>
            )}
       <div className='display'>
   
       </div>
       <div className='aContainers'>
       <form type='form' ref={form} onSubmit={sendEmail}>
           <h1>Your FeedBack</h1>
           <input required type='text' placeholder='Enter name' name='user_name'/>
           <input required type='email' placeholder='Enter email' name='user_email'/>
            <textarea required placeholder='Enter message' name='message'></textarea>
            <button type="submit" value="Send">Leave response</button>
            {open && "Sent successfully"}
       </form>
       </div>
    </div>
  )
}

export default RatingPhoto