import React,{useState,useEffect,useContext} from 'react'
import { DetailsContext } from '../Context/DetailsContext';
import { LoginContext } from '../Context/LoginContext';
import {useLocation,useNavigate} from 'react-router-dom'
import Navbar from './Navbar'
import {auth } from "../firebase"
import {RecaptchaVerifier,   signInWithPhoneNumber } from "firebase/auth";
import './StripeComplete.css'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import axios from 'axios'
import useFetch from '../Hooks/useFetch'
import { SearchContext } from '../Context/SearchContext'
// import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import StripeCheckout from 'react-stripe-checkout';
function StripeComplete() {

  const location = useLocation()
  const identityID = location.state.stripeID
  const roomID = location.state.roomState

  const [levels, setLevels] = useState([])
 const objectData =`http://localhost:5000/hotel/hotel/${identityID}`
 const fetchDatas = async(objectData)=>{
  try{
    const res = await axios.get(objectData)
    setLevels(res.data)
  }catch(error){console.log(error)}
 }
 fetchDatas(objectData)


 const level= [levels]
//  const objectDatas = [objectData]
  const {savedData,loading,error,dispatch} = useContext(DetailsContext)
  const id = savedData.details._id
  const {data} = useFetch(`http://localhost:5000/Orders/getusers/${id}`)
  const datas = [data]
  const { options,date } = useContext(SearchContext)
  // const hotelname = level?.map(item => item.name)
  const roomname = roomID[0]
  // console.log(roomname,hotelname)
const MILLI_SEC_PER_DAY = 1000 * 60 * 60 * 24 ;
function dayDifference( date1 , date2){
  const timeDiff = Math.abs( date2?.getTime() -   date1?.getTime())
  const diffDays = Math.ceil(timeDiff / MILLI_SEC_PER_DAY)
  return diffDays;
}
const days = dayDifference(  date[0]?.endDate,   date[0]?.startDate)
const navigate = useNavigate()
const dayone = date[0]?.startDate
const daytwo = date[0]?.endDate
// console.log(dayone,daytwo)
// const amounts = (level.cheapestPrice*days*options.room)
const[stripeToken, setStripeToken] = useState(null)
const onToken = (token)=>{
  setStripeToken(token)
}
const amountss = levels?.cheapestPrice*days*options.room
const {user} = useContext(LoginContext)
const userid = user._id
const useremail = user.email
  const [phonenumber, setPhoneNumber] = useState("")
  const [verifyCode, setVerifyCode] = useState("")
  const [final, setFinal] = useState("")
  const [open, setOpen] = useState(false)
  const [opens, setOpens] = useState(false)
  const [openss, setOpenss] = useState(false)
  const phonenumbers = `+${phonenumber}`

  // const getResponse = () =>{
    
  // }
  const sendOtp = (e) =>{
    e.preventDefault()
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        console.log(response)
      },
      'expired-callback': () => {
        // Response expired. Ask user to solve reCAPTCHA again.
        // ...
       
      }
    }, auth);
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phonenumbers, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      setFinal(window.confirmationResult)
      alert("code sent")
      setOpen(true)

    }).catch((error) => {
    //  console.log(error)
    });
  }
  const verifyOtp = (e) =>{
      e.preventDefault()

      // confirmationResult.confirm(code).then((result) => {
      
      //   const user = result.user;
        
      // }).catch((error) => {
      
      // });
      // console.log(final)

      final.confirm(verifyCode).then((result) => {
        // User signed in successfully.
      //  console.log(result)
       setOpens(true)
        // ...
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        // console.log(error)
       setOpenss(true)

      });

  }
useEffect(()=>{
  const makeRequest = async()=>{
  try{
      const res = await axios.post("http://localhost:5000/userr/checkout",{
        tokenId: stripeToken.id,
        amount: amountss * 100
      })
      await axios.post(`http://localhost:5000/Bookorders/${userid}`,{days: days, dayone: dayone, phonenumbers: phonenumbers,roomname: roomname,name: useremail, daytwo: daytwo})
      navigate("/payments",{state:  amountss})

      }catch(err){console.log(err)}
    }
      stripeToken && makeRequest()

},[stripeToken, amountss,navigate])
  
  return (
    <div className='stripeComplete'>
      <Navbar/>
      <div className='stripesContainer'>
        <div className='stripeShipping'>
        {datas.map((item,i)=>{
        return <div className='shoppingCart' key={i}>
          <h1>Review Your Order</h1>
          <h2>Shipping Address</h2>
          <div className='paragraLayer'>
            <p>Name: </p><span className='shopSpan'>{item.name}</span>
          </div>
          <div className='paragraLayer'>
          <p>Town: </p><span  className='shopSpan'>{item.town}</span>
          </div> 
          <div className='paragraLayer'>
          <p>Phone: </p><span  className='shopSpan'>{item.number}</span>
          </div>
           <div className='paragraLayer'>
          <p>Area:</p><span  className='shopSpan'> {item.areas}</span>
          </div>
           <div className='paragraLayer'>
          <p>Province:</p><span  className='shopSpan'>{item.province}</span>
          </div>
         </div>})}
        <div className='paymentOPtion'>
          <h1>PAYMENT METHOD</h1>
          <p style={{ fontSize: 15, marginTop: 15,fontFamily: "Poppins",marginLeft: 15}}>Bank payment</p>
        </div>
    {level?.map((item,i)=>{
      return <div className='orderStats' key={i}>
        <div className='orderstartss'>
         <h1>ROOMS : </h1><p style={{fontSize: 18, color: "teal",marginLeft: 15,letterSpacing: 2}}> {options.room} room(s)</p>
        </div>
        <div className='orderstartss'>
        <h1>PRICE:</h1><p style={{color: "teal",fontSize: 18, marginLeft: 9,letterSpacing: 2}}> ${item.cheapestPrice*days*options.room}</p>
        </div>
        <div className='orderstartss'>
        <h1>DAYS TO STAY :</h1><p style={{marginLeft: 15,fontSize:18}}> {days} day(s)</p>
        </div>
        </div>})}
        </div>
        <div className='paymentPage'>
          
          <div className='verification_page'>
          <div className='phone_input'>
            <h1>verify your phone number</h1>
          </div>
          <div className='phone_input'>
            {/* <h1>Select how to receive code!!</h1> */}
            
            { opens && <p className='input_select' >
                {/* // <option>sms</option>
                // <option>whatsapp</option>
                // <option>call</option> */}
                <p>PhonenumberVerification successful!!</p>
              </p>} 
              { openss && <p className='input_selects' >
                {/* // <option>sms</option>
                // <option>whatsapp</option>
                // <option>call</option> */}
                <p>Wrong verification code!!</p>
              </p>} 
              <div id="recaptcha-container"></div>
                {/* <PhoneInput
                  country="US"
                  value={phonenumber}
                  onChange={setPhoneNumber}
                  /> */}
          <input className='input_phonnumber' required  type="number" placeholder="Enter phonenumber" onChange={(e)=>setPhoneNumber(e.target.value)}/>

            <button className='input_button' onClick={sendOtp}>Request code</button>
       </div>
       {open && <div>
          <input className='input_phonnumbers' required  type="number" placeholder="Enter code" onChange={(e)=>setVerifyCode(e.target.value)}/>
          <button className='input_button' onClick={verifyOtp}>Verify</button>
       </div>}
          </div>

        <div className='paymentPageContainer'>
       {level?.map((items,i)=>{
        return <div className='paymentContainer' key={i}>
            <p>TOTAL PRICE({days}-days) :</p>
            <h2>${items.cheapestPrice*days*options.room}</h2>
          </div>
          })}
          <div className='paymentInput'>
            <input type='checkbox' />
            <p>This order contains a gift</p>
          </div>
          <div className='buttonContainer'>
            <StripeCheckout
              name="Booking Shop" // the pop-in header title
              description={`Number of room(s) ${options.room}`}  // the pop-in header subtitle
              image="/images/ken.jpg" // the pop-in header image (default none)
              amount={amountss*100} // cents
              currency="USD"
              billingAddress
              stripeKey="pk_test_51LHrwyBVP5viye6wD4xBD8eSEKWLQTdrIdicuDlnosQ4XSvKIUMKJqwq3fOAPa03FSJHqGBdI07jIgzEToSxoFGh00Q4WdAkbQ"
              token={onToken}
            >
              <button className="stripeButton" disabled={phonenumbers === "" || verifyCode === ""}>Complete Order</button>
            </StripeCheckout>
          </div>
        </div>
        </div>
        </div>
    </div>
  )
}

export default StripeComplete