import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import Profile from '../Profile/Profile.js';
import { useAuthContext } from '../../hooks/useAuthContext.js';
import { useLogout } from '../../hooks/useLogout.js';
import './Navbar.css'
const Navbar = () => {
    const [showProfile,setShowProfile]=useState(false)
    const {user}=useAuthContext()
    const {logout}=useLogout()
    const handleClick=()=>{
        logout()
    }
  return (
    <header>
        <nav>
            <div className='contain'>
                <Link to='/'>
                    <h1>Logo</h1>
                </Link>
                {user?<section>
                <CgProfile size={25} onClick={()=>{setShowProfile(true)}}/>
                <button onClick={handleClick}>Logout</button>
                </section>
                :<div>
                    <Link to="/login">
                        Login
                    </Link>
                    <Link to="/signup">
                        Signup
                    </Link>
                </div>}
            </div>
        </nav>
        {showProfile && <Profile remove={()=>{setShowProfile(false)}}/>}
    </header>
  )
}
export default Navbar
