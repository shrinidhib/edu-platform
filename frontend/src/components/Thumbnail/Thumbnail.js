import React from 'react'

const Thumbnail = ({videoId}) => {
  return (
    <div className='thumbnail container'>
        <img className='thumbnail' key={v._id} src={`https://img.youtube.com/vi/${videoId}/default.jpg`}/>
    </div>
  )
}

export default Thumbnail