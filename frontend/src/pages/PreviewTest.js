import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const PreviewTest =({t}) => {
    console.log(t)
    const [test,setTest]=useState(t)
  return (
    <div>
    {test && 
        <div>
            <div>{test.title}
            </div>
            <p>here</p>
        </div>}
    </div>
  )
}

