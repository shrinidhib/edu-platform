import React, { useEffect, useState } from 'react'
import Thumbnail from '../components/Thumbnail/Thumbnail'
import { useAuthContext } from '../hooks/useAuthContext'
import { CiSearch } from 'react-icons/ci'

const AllVid = () => {
    const [allVideos,setAllVideos]=useState([])
    const [title,setTitle]=useState("")
    const {user}=useAuthContext()
    const handleSearch=async(e)=>{
        e.preventDefault()
        const response= await fetch(`http://localhost:4005/videos/search/${title}`,{
            method: 'GET',
            headers:{
                "Authorization":`Bearer ${user.token}`
            }
        })
        const result=await response.json()
        if(response.ok){
            setAllVideos(result)
            setTitle('')
        }     
    }
    useEffect(()=>{
        const getAllVids=async ()=>{
            const response= await fetch('http://localhost:4005/videos/all',{
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
        if(user){
            getAllVids()
        }
    },[user])
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
    <div>
        <form className='search' onSubmit={handleSearch}>
            <button type='submit'>
                <CiSearch size={20}/>
            </button>
            <input type='text' placeholder='Search' onChange={(e)=>setTitle(e.target.value)} value={title}/>
        </form>
        <div className='allvids'>
        {allVideos.length!==0 && allVideos.map((vid)=>{
                const videoId=fetchVideoId(vid)
                return <Thumbnail key={videoId} title={vid.title} videoId={videoId}/>
            })}
        </div>
    </div>
  )
}

export default AllVid