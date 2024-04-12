import { useAuthContext } from "./useAuthContext.js";
import { useState } from "react";

export const useLogin=()=>{
    // const {videos,dispatch:dispatch1}=useVideoContext()
    const {dispatch}=useAuthContext()
    const [error,setError]=useState(null)
    const [loading,setLoading]=useState(null)

    const login=async(email,password)=>{
        setError(null)
        setLoading(true)
        const data={
            email:email,
            password:password
        }
        const response=await fetch("https://edu-frontend-sage.vercel.app/users/login",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json"
            }
        })
        const result=await response.json()

        if(!response.ok){
            setError(result.error)
            setLoading(false)
        }
        if(response.ok){
            dispatch({type:"LOGIN",payload:result}) 
            localStorage.setItem("user",JSON.stringify(result))
            localStorage.setItem("recents",JSON.stringify(result.recents))
            setLoading(false)
        }
    }
    return {error,loading,login}
}