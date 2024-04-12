import React,{useEffect, useState} from 'react'
import { useAuthContext } from '../hooks/useAuthContext.js'
import Thumbnail from '../components/Thumbnail/Thumbnail.js'
import Carousell from '../components/Carousel.js'
import './css/Home.css'

const Home = () => {
    const {user}=useAuthContext()
    const [recents,setRecents]=useState([])
    useEffect(()=>{
        const getRec=async ()=>{
            const id=user.user._id
            const response=await fetch(`https://edu-backend-mu.vercel.app/users/recents/${id}`,{
                headers:{
                    "Authorization":`Bearer ${user.token}`
                }
            })
            const result=await response.json()
            setRecents(result.recents)
        }
        if(user){
            getRec()
        }
    },[user])

  return (
    <div className='home'>
        <div className='cont'>
            <Carousell/>
        </div>
        {recents.length!==0 && user.user.designation==="Student" && <div className='recent'>
            <h3>Recents</h3>
            <div className='recent-box'>
                {recents.map((vid)=>{
                    return <Thumbnail key={vid.url} videoId={vid.videoId} title={vid.title}/>
                })}
            </div>
        </div>}
    </div>
  )
}

export default Home
