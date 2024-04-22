import React, { useEffect} from 'react'
import  AddVideo  from '../components/AddVideo/AddVideo.js'
import ThumbnailTeacher from '../components/Thumbnail/ThumbnailTeacher.js'
import { useVideoContext } from '../hooks/useVideoContext.js'
import { useAuthContext } from '../hooks/useAuthContext.js'
import './css/Videos.css'
export const Videos = () => {
    const {videos,dispatch}=useVideoContext()
    const {user}=useAuthContext()

    
    useEffect(()=>{
        const fetchVideos=async()=>{
            const response= await fetch(`https://edu-backend-mu.vercel.app/videos/filter/${user.user._id}`,{
                method: 'GET',
                headers:{
                    "Authorization":`Bearer ${user.token}`
                }
            })
            const json=await response.json()
            if (response.ok){
                dispatch({type:"SET_VIDEOS",payload:json})
            }
            else{
                console.log('error')
            }
        }
        if(user){
            fetchVideos()
        }
    },[user,dispatch]) //works for initial render aswell!!

    const fetchVideoId=(video)=>{
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = video.url.match(regex);
        if (match && match[1]) {

            return match[1];
        } else {
            return null;
        }
    }

  return (
    <div >
        {videos && videos.length!==0 && <div>
        <h3>Your Uploads</h3>
        <div className='video-list-outer'>
            <div className='video_list'>
            {videos.map((v)=>{
                    const videoId=fetchVideoId(v)
                    return(
                        <ThumbnailTeacher key={v._id} videoId={videoId} title={v.title} id={v._id}/>
                    )})}
            </div>
        </div>
        </div>}
        <AddVideo/>
    </div>
    
  )
}


