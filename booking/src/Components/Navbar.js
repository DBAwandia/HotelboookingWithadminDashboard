import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from './Header'
import{ LoginContext }from "../Context/LoginContext"
import './Navbar.css'
function Navbar() {
    const {user,dispatch} = useContext(LoginContext)
    const navigate = useNavigate()
    const logout = () =>{
        dispatch({type: "LOGOUT"})
        navigate("/login")
    }
  return (
    <div className='navbar'>
        <div className="navContainer">
            <div className='nContainer'>
                <h1 className='logo'><Link to='/'>Hotelbooking </Link><span>&#127863;</span></h1>
               {!user && <div className='bContainer'>
                    <button>
                        <Link to="/register">Register</Link>
                    </button>
                    <button>
                      <Link to="/login">Login</Link>
                   </button>
                </div>}
                {user && <div className='logouts'>
                  <p>Email: {user.email}</p>
                  <button onClick={logout}>
                    LOGOUT
                  </button>
               </div>}
            </div>
        <div className="hearer">
            <Header />
         </div>
        </div>
    </div>
  )
}

export default Navbar