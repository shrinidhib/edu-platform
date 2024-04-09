import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext.js";
import { useState } from "react";

export const useLogout=()=>{
    const navigate=useNavigate()
    const {dispatch}=useAuthContext()

    const logout=()=>{
        localStorage.removeItem("user")
        localStorage.removeItem("recents")
        dispatch({type:"LOGOUT",payload:null})
        navigate('/login')
    }
    return {logout}
}