import React,{useEffect, useState} from 'react'
import {BrowserRouter,Routes,Route,Link,Navigate} from "react-router-dom"
import Home from './pages/Home.js'
import Navbar from './components/Navbar/Navbar.js'
import LinkElement from './components/LinkElement.js'
import { RiHome2Line } from "react-icons/ri";
import { GoBook } from "react-icons/go";
import { IoDocumentsOutline } from "react-icons/io5";
import { LiaVideoSolid } from "react-icons/lia";
import { FaRegNoteSticky } from "react-icons/fa6";
import { GrTest } from "react-icons/gr";
import { MdOutlineForum } from "react-icons/md";
import { CiChat1 } from "react-icons/ci";

import { TiPencil } from "react-icons/ti";
import Signup from './pages/Signup.js'
import Login from './pages/login.js'
import MyNotes from './pages/MyNotes.js'
import CreateTest from './pages/CreateTest.js'
import MyTests from './pages/MyTests.js'
import Tests from './pages/Tests.js'
import { useAuthContext } from './hooks/useAuthContext.js'
import Learn from './pages/Learn.js'
import { VideoView } from './pages/VideoView.js'
import { Videos } from './pages/Videos.js'
import AllVid from './pages/AllVid.js'
import TakeTest from './pages/TakeTest.js'
import ViewAllScores from './pages/ViewAllScores.js'
import DisplayScores from './pages/DisplayScores.js'
import AllForums from './pages/AllForums.js'
import CreateForum from './pages/CreateForum.js'
import DisplayForum from './pages/DisplayForum.js'

// http://localhost3000/signup
const App = () => {
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
    <div className='App'>
      <BrowserRouter>
      <Navbar/>
        <div className='layout'>
          {user && <div className='sidebar'>
            <div className='links'>
              <ul>
              <li onClick={()=>{handleClick("Home")}}><LinkElement active={activeLink} text="Home" icon={<RiHome2Line/>} path="/"/></li>
              <li onClick={()=>{if (check){
                handleClick("Teach")}
                else{
                  handleClick('Learn')
                }}}>{check? <LinkElement active={activeLink} text="Teach" icon={<GoBook/>} path="/addvideos"/> : <LinkElement text="Learn" active={activeLink} icon={<GoBook/>} path="/learn"/>}</li>
              <li onClick={()=>{handleClick("Videos")}}>{<LinkElement active={activeLink} text="Videos" icon={<LiaVideoSolid/>} path="/allvideos"/>}</li>
              <li onClick={()=>{handleClick("Docs")}}>{check && <LinkElement active={activeLink} text="Docs" icon={<IoDocumentsOutline/>} path="/addvideos"/>}</li>
              <li onClick={()=>{handleClick("My Notes")}}>{!check && <LinkElement active={activeLink} text={"My Notes"} icon={<FaRegNoteSticky />} path="/mynotes"/>}</li>
              <li onClick={()=>{handleClick("My Tests")}}>{check && <LinkElement active={activeLink} text={"My Tests"} icon={<GrTest />} path="/mytests"/>}</li>
              <li onClick={()=>{handleClick("Tests")}}>{!check && <LinkElement active={activeLink} text={"Tests"} icon={<GrTest />} path="/tests"/>}</li>
              <li onClick={()=>{handleClick("Create Test")}}>{check && <LinkElement active={activeLink} text={"Create Test"} icon={<TiPencil />} path="/createtest"/>}</li>
              <li onClick={()=>{handleClick("Forums")}}>{<LinkElement active={activeLink} text={"Forums"} icon={<MdOutlineForum />} path="/forums"/>}</li>
              <li onClick={()=>{handleClick("Create Forum")}}>{<LinkElement active={activeLink} text={"Create Forum"} icon={<CiChat1 />} path="/createforum"/>}</li>
              </ul>
            </div>
          </div>}
          <div className='pages'>
            <Routes>
              <Route path='/' element={user?<Home/>:<Navigate to="/login"/>}/>
              <Route path="/login" element={!user?<Login/>:<Navigate to='/'/>}/>
              <Route path="/signup" element={!user?<Signup/>:<Navigate to='/'/>}/>
              <Route path='/learn' element={check?<Navigate to='/addvideos'/>:<Learn/>}/>
              <Route path='/allvideos' element={<AllVid/>}/>
              <Route path='/mynotes' element={!check?<MyNotes/>:null}/>
              <Route path='/watch/:videoId' element={user?<VideoView/>:null}/>
              <Route path='/createtest' element={check?<CreateTest/>: null}/>
              <Route path='/mytests' element={check?<MyTests/>:null}/>
              <Route path='/viewallscores/:testID' element={<ViewAllScores/>}/>
              <Route path='/displayscores' element={<DisplayScores/>}/>
              <Route path='/tests' element={!check?<Tests/>:null}/>
              <Route path='/taketest/:testID' element={!check?<TakeTest/>:null}/>
              <Route path='/addvideos' element={check?<Videos/>:<Navigate to='/learn'/>}/>
              <Route path="/forums" element={<AllForums/>} />
              <Route path="/createforum" element={<CreateForum/>}/>
              <Route path="/forums/:forumID" element={<DisplayForum/>}/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App




