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
            <h4>Username: {user.user.username}</h4>
            <h4>Email: {user.email}</h4>
            <h4>Designation: {user.user.designation}</h4>
        </div>
      </div>
    </div>
  )
}

export default Profile
