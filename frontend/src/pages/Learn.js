import React,{useEffect} from 'react'
import Carousel from '../components/Carousel.js'
import { useAuthContext } from '../hooks/useAuthContext.js'
import Thumbnail from '../components/Thumbnail/Thumbnail.js'
import { useVideoContext } from '../hooks/useVideoContext.js'
import { Link } from 'react-router-dom'

const Learn = () => {
    const {user}=useAuthContext()
    const {videos,dispatch}=useVideoContext()

    useEffect(()=>{
        const fetchVideos=async()=>{
            const response= await fetch('http://localhost:4005/videos/all',{
                method: 'GET',
                headers:{
                    "Authorization":`Bearer ${user.token}`
                }
            })
            const json=await response.json()
            // console.log(json)
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
    },[user,dispatch])

    const fetchVideoId=(video)=>{
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = video.url.match(regex);
        if (match && match[1]) {
            return match[1];
        } else {
            return null;
        }
    }

  return (// copied from home
    <div className='learn'> 
        <div className='cont'>
            <h3>Docs</h3>
        </div>
        
            <div className='recent'>
                <Link to='/allvideos'><h3>Videos</h3></Link>
                <div className='recent-box'>
                    {videos && videos.length!==0 && videos.map((vid)=>{
                        const videoId=fetchVideoId(vid)
                        return <Thumbnail key={vid.url} title={vid.title} videoId={videoId}/>
                    })}
                </div>
            </div>
   
    </div>
  )
}

export default Learn