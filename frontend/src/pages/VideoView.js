import React from 'react'
import { useParams } from 'react-router-dom'

export const VideoView = () => {
    const {videoId}=useParams()
    console.log(videoId)
  return (
    <div>VideoView</div>
  )
}
