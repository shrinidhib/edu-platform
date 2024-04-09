import React from 'react'
import { Link } from 'react-router-dom'


const LinkElement = ({text,icon,path,active}) => {
  console.log(active)
  return (
    <div className={`linkele ${active===text?"highlight":""}`}>
        <div>{icon}</div>
        <Link className={`${active===text?"highlight":""}`} to={path}>{text}</Link>
    </div>
  )
}

export default LinkElement
