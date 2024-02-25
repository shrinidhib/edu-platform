import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import NoteForm from '../components/NoteForm/NoteForm'

export const VideoView = () => {
    const [showAddNote, setShowAddNote]=useState(false)
    const [showButton, setShowButton]=useState(true)
    const {videoId}=useParams()
    console.log(videoId)
    const toggleModal=()=>{
        setShowButton((prev)=>!prev)
        setShowAddNote((prev)=> !prev)
    }
  return (
    <div className='video-view-page'>
        <div className='watch'>
        <iframe className='video' src={`https://www.youtube.com/embed/${videoId}`} title="YouTube video player" frameBorder="10"  allowFullScreen></iframe> 
        </div>
        <div className='modal-button'>
            {showButton && <button className='createnote-btn' onClick={toggleModal}>Create Note</button>}
            
        </div>
        {showAddNote && <NoteForm toggleModal={toggleModal}/>}
        
    </div>
  )
}
