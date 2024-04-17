import React, { useState } from 'react'
import { RiHome2Line } from "react-icons/ri";
import { GoBook } from "react-icons/go";
import { IoDocumentsOutline } from "react-icons/io5";
import { LiaVideoSolid } from "react-icons/lia";
import { FaRegNoteSticky } from "react-icons/fa6";
import { GrTest } from "react-icons/gr";
import { MdOutlineForum } from "react-icons/md";
import { CiChat1 } from "react-icons/ci";
import { TiPencil } from "react-icons/ti";
import { IoStatsChartOutline } from "react-icons/io5";
import { useAuthContext } from '../hooks/useAuthContext.js';
import LinkElement from './LinkElement.js';
const SideBar = () => {
    const [activeLink,setActiveLink]=useState("")
    const {user}=useAuthContext()
    let designation
    let check=false
    if(user){
      designation=user.user.designation
      if(designation==="Teacher"){
        check=true
      }
      
    }
    const handleClick=(text)=>{
        setActiveLink(text)
      }
  return (
    <div className='sidebar'>
    <div className='links'>
      <ul>
      <li onClick={()=>{handleClick("Stats")}}>{<LinkElement active={activeLink} text="Stats" icon={<IoStatsChartOutline/>} path="/userdetails"/>}</li>
      <li onClick={()=>{handleClick("Home")}}><LinkElement active={activeLink} text="Home" icon={<RiHome2Line/>} path="/"/></li>
      <li onClick={()=>{if (check){
        handleClick("Teach")}
        else{
          handleClick('Learn')
        }}}>{check? <LinkElement active={activeLink} text="Teach" icon={<GoBook/>} path="/addvideos"/> : <LinkElement text="Learn" active={activeLink} icon={<GoBook/>} path="/learn"/>}</li>
      <li onClick={()=>{handleClick("Videos")}}>{<LinkElement active={activeLink} text="Videos" icon={<LiaVideoSolid/>} path="/allvideos"/>}</li>
      <li onClick={()=>{handleClick("Docs")}}>{<LinkElement active={activeLink} text="Docs" icon={<IoDocumentsOutline/>} path="/alldocs"/>}</li>
      <li onClick={()=>{handleClick("My Notes")}}>{!check && <LinkElement active={activeLink} text={"My Notes"} icon={<FaRegNoteSticky />} path="/mynotes"/>}</li>
      <li onClick={()=>{handleClick("My Tests")}}>{check && <LinkElement active={activeLink} text={"My Tests"} icon={<GrTest />} path="/mytests"/>}</li>
      <li onClick={()=>{handleClick("Test Stats")}}>{!check && <LinkElement active={activeLink} text={"Test Stats"} icon={<GrTest />} path="/displayscores"/>}</li>
      <li onClick={()=>{handleClick("Tests")}}>{!check && <LinkElement active={activeLink} text={"Tests"} icon={<GrTest />} path="/tests"/>}</li>
      <li onClick={()=>{handleClick("Create Test")}}>{check && <LinkElement active={activeLink} text={"Create Test"} icon={<TiPencil />} path="/createtest"/>}</li>
      <li onClick={()=>{handleClick("Forums")}}>{<LinkElement active={activeLink} text={"Forums"} icon={<MdOutlineForum />} path="/forums"/>}</li>
      <li onClick={()=>{handleClick("Create Forum")}}>{<LinkElement active={activeLink} text={"Create Forum"} icon={<CiChat1 />} path="/createforum"/>}</li>
      </ul>
    </div>
  </div>
  )
}

export default SideBar

