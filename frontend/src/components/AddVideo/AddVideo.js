import { useState } from 'react'
import './AddVideo.css'


export const AddVideo = () => {
    const [inputUrl,setInputUrl]=useState('')
    const [error,setError]=useState(null)
    const addVideoHandler=async()=>{
        const pattern = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\S+)?$/;
        const isValid = pattern.test(inputUrl); 

        if (!isValid){
            window.alert('Please enter a valid video url')
        }
        else{
            const url=inputUrl
            const video={url}
            const response= await fetch('http://localhost:4005/videos',{
                method: 'POST',
                body: JSON.stringify(video),
                headers:{
                    'Content-type': 'application/json'
                }
            })
            const json=await response.json()
            if (!response.ok){
                setError(json.error)
            }
            else{
                setInputUrl('')
                setError(null)
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
        <button >Submit</button>
    </form>
  )
}

