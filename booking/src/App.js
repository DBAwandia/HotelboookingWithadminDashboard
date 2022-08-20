import React, { useContext } from 'react'
import {Button} from '@mui/material'
import Home from "./Components/Home"
import Navbar from "./Components/Navbar"
import Registration from "./Pages/Registration"
import Login from "./Pages/Login"
import { Navigate,BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Header from './Components/Header'
import Hotel from './Components/Hotel'
import Mapbox from './Components/Mapbox'
import ExactHotel from './Components/ExactHotel'
import { LoginContext } from './Context/LoginContext'
import Bed from './Components/Bed'
import Slider from './Components/Slider'
import Pagination from './Components/Pagination'
import Delivery from './Components/Delivery'
import Stripes from './Components/Stripes'
import Stripe from './Components/Stripe'
import StripeComplete from './Components/StripeComplete'
import Swipers from './Components/Swipers'
import MappingObj from './Components/MappingObj'
import Payment from './Components/Payment'
// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// const promise = loadStripe('pk_test_51LHrwyBVP5viye6wD4xBD8eSEKWLQTdrIdicuDlnosQ4XSvKIUMKJqwq3fOAPa03FSJHqGBdI07jIgzEToSxoFGh00Q4WdAkbQpk_test_51LHrwyBVP5viye6wD4xBD8eSEKWLQTdrIdicuDlnosQ4XSvKIUMKJqwq3fOAPa03FSJHqGBdI07jIgzEToSxoFGh00Q4WdAkbQ');
function App() {
  const ProtectedRoute = ({children})=>{
  const {user } = useContext(LoginContext)
  if(!user){
    <Navigate to="/login" />
  }else{
    return children
  }
  }
  return (
    <div>
      <Router>
        <Routes>
            <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>} />
            <Route path='/navbar' element={<ProtectedRoute><Navbar/></ProtectedRoute>} />
            <Route path='/login' element={<Login/>} />
            <Route path='hotels' element={<ProtectedRoute><Hotel/></ProtectedRoute>} />
            <Route path='/:hotelid' element={<ProtectedRoute><ExactHotel/></ProtectedRoute>} />
            <Route path='/register' element={<Registration/>} />
            <Route path='/bed' element={<ProtectedRoute><Bed/></ProtectedRoute>} />
            <Route path='/stripe' element={<ProtectedRoute><Stripe /></ProtectedRoute>} />
            <Route path='/completed' element={<ProtectedRoute><StripeComplete/></ProtectedRoute>} />
            <Route path='/swiper' element={<ProtectedRoute><Slider/></ProtectedRoute>} />
            <Route path='/room' element={<ProtectedRoute><MappingObj/></ProtectedRoute>} />
            <Route path='/stripes' element={<ProtectedRoute><Stripes/></ProtectedRoute>} />
            <Route path='/payments' element={<ProtectedRoute><Payment/></ProtectedRoute>} />
            <Route path='/sliper' element={<ProtectedRoute><Swipers/></ProtectedRoute>} />
            <Route path='/delivery' element={<ProtectedRoute><Delivery/></ProtectedRoute>} />
            <Route path='/view/map/:id' element={<ProtectedRoute><Mapbox/></ProtectedRoute>} />
            <Route path='/paginate' element={<ProtectedRoute><Pagination/></ProtectedRoute>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;



