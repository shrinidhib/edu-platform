import React, { useEffect, useState } from 'react'
import { AddVideo } from '../components/AddVideo/AddVideo'
import Thumbnail from '../components/Thumbnail/Thumbnail'

export const Videos = () => {
    const [videosList,setVideosList]=useState([])
    
    useEffect(()=>{
        const fetchVideos=async()=>{
            const response= await fetch('http://localhost:4005/videos',{
                method: 'GET',
            })
            const json=await response.json()
            if (response.ok){
                setVideosList(json)
                console.log(videosList)
            }
            else{
                console.log('error')
            }
        }

        fetchVideos()
       
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
    <div >
        <div className='video_list'>
        {videosList && videosList.map((v)=>{
                 const videoId=fetchVideoId(v)
                 return(
                    <Thumbnail key={v._id} videoId={videoId}/>
                 )})}
        </div>
        <AddVideo/>
    </div>
    
  )
}
