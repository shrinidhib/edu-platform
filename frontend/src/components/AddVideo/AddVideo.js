import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext.js'
import { useVideoContext } from '../../hooks/useVideoContext.js'

const AddVideo = () => {
    const {videos,dispatch}=useVideoContext()
    const {user}=useAuthContext()
    const [inputUrl,setInputUrl]=useState('')
    const [title,setTitle]=useState('')
    const [error,setError]=useState(null)
    const addVideoHandler=async(e)=>{
        e.preventDefault()
        const pattern = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\S+)?$/;
        const isValid = pattern.test(inputUrl); 

        if (!isValid){
            window.alert('Please enter a valid video url')
        }
        else{
            setError(null)
            const url=inputUrl
            const video={url,title,teacher_id:user.user._id}
            const response= await fetch('https://edu-backend-mu.vercel.app/videos/addvideos',{
                method: 'POST',
                body: JSON.stringify(video),
                headers:{
                    'Content-type': 'application/json',
                    "Authorization":`Bearer ${user.token}`
                }
            })
            const json=await response.json()
            if (!response.ok){
                setError(json.error)
                console.log(error)
            }
            else{
                setInputUrl('')
                setTitle('')
                setError(null)
                dispatch({type:"ADD_VIDEO",payload:json})
            }
        }
    }
  return (
    <form onSubmit={addVideoHandler}>
        <input 
        type='text' 
        placeholder='Add video url' 
        value={inputUrl} 
        onChange={(e)=>setInputUrl(e.target.value)}
        />
        <input type='text' placeholder='Add Title' value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
        <button >Submit</button>
        {error && <div>An error occurred while uploading. Try again</div>}
    </form>
  )
}
export default AddVideo
