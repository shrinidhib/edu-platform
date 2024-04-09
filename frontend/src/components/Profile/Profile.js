import React from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { useAuthContext } from '../../hooks/useAuthContext.js';
import './Profile.css'

const Profile = ({remove}) => {
    const {user}=useAuthContext()
  return (
    <div className='profile' onClick={()=>{remove()}}>
      <div className='details' onClick={(e)=>{e.stopPropagation()}}>
        <span><IoCloseSharp size={25} onClick={()=>{remove()}}/></span>
        <div>
            <h3>{user.email}</h3>
            <h3>{user.user.designation}</h3>
        </div>
      </div>
    </div>
  )
}

export default Profile
