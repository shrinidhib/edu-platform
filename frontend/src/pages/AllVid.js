import React, { useEffect, useState } from 'react'
import Thumbnail from '../components/Thumbnail/Thumbnail'
import { useAuthContext } from '../hooks/useAuthContext'

const AllVid = () => {
    const [allVideos,setAllVideos]=useState([])
    const {user}=useAuthContext()
    useEffect(()=>{
        const getAllVids=async ()=>{
            const response= await fetch('https://edu-frontend-sage.vercel.app/videos/all',{
                method: 'GET',
                headers:{
                    "Authorization":`Bearer ${user.token}`
                }
            })
            const result=await response.json()
            if(response.ok){
                setAllVideos(result)
            }
        }
        getAllVids()
    },[])
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
    <div className='allvids'>
      {allVideos.length!==0 && allVideos.map((vid)=>{
            const videoId=fetchVideoId(vid)
            return <Thumbnail key={videoId} title={vid.title} videoId={videoId}/>
        })}
    </div>
  )
}

export default AllVid
