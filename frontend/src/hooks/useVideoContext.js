import { useContext } from "react";
import { VideoContext } from "../context/VideoContext.js";

export const useVideoContext=()=>{
    const context=useContext(VideoContext)
    
    return context
}