import {createContext,useReducer} from "react"
export const VideoContext=createContext()

export const videosReducer=(state,action)=>{
    switch (action.type){
        case "SET_VIDEOS":
            return {videos:action.payload}
        case "DELETE_VIDEO":
            return {videos:state.videos.filter((v)=>{return (v._id!==action.payload.video._id)})}
        case "ADD_VIDEO":
            return {videos:[action.payload,...state.videos]}
        default:
            return state
    }
}

const VideoContextProvider=({children})=>{
    const [state,dispatch]=useReducer(videosReducer,{videos:null})
    console.log("videos state",state)
    return(// ...state=videos
        <VideoContext.Provider value={{...state,dispatch}}>
            {children}
        </VideoContext.Provider>
    )
}

export default VideoContextProvider