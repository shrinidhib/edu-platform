import React,{useState} from 'react'
import { useSignup } from '../hooks/useSignup.js'
import  './css/LoginSignup.css'


const Signup = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [designation,setDesignation]=useState("Teacher")
    const [username, setUsername]=useState("")
    const {error,loading,signup}=useSignup()//destructure
    const handleSubmit=async(e)=>{
        e.preventDefault()
        await signup(username,email,password,designation)
    }

  return (
    <div style={{width:"100vw", height: "80vh", alignContent:"center"}}>
        <form className='signup' onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" onChange={(e)=>{setUsername(e.target.value)}}/>
            <label>Email</label>
            <input type="text" onChange={(e)=>{setEmail(e.target.value)}}/>
            <label>Designation</label>
            <select value={designation} onChange={(e)=>{setDesignation(e.target.value)}}>
              <option value="Teacher">Teacher</option>
              <option value="Student">Student</option>
            </select>
            <label>Password</label>
            <input type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
            <button disabled={loading}>Signup</button>
            {error && <div className='error'>{error}</div>}
        </form>
    </div>
  )
}

export default Signup