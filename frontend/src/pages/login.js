import React,{useState} from 'react'
import { useLogin } from '../hooks/useLogin.js'
import  './css/LoginSignup.css'

const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const {error,loading,login}=useLogin()//destructure
    const handleSubmit=async(e)=>{
        e.preventDefault()
        await login(email,password)
    }

  return (
    <div style={{width:"100vw", height: "80vh", alignContent:"center"}}>
        <form className='login' onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="text" onChange={(e)=>{setEmail(e.target.value)}}/>
            <label>Password</label>
            <input type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
            <button disabled={loading}>Login</button>
            {error && <div className='error'>{error}</div>}
        </form>

    </div>
  )
}

export default Login