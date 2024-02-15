import { useState } from 'react'
import './AddVideo.css'


export const AddVideo = () => {
    const [inputUrl,setInputUrl]=useState('')
    const addVideoHandler=()=>{

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
