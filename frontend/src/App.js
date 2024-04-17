import React from 'react'
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import Home from './pages/Home.js'
import Navbar from './components/Navbar/Navbar.js'
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
import DisplayScores from './pages/DisplayScores.js'
import AllForums from './pages/AllForums.js'
import CreateForum from './pages/CreateForum.js'
import DisplayForum from './pages/DisplayForum.js'
import AllDoc from './pages/AllDoc.js'
import SideBar from './components/SideBar.js'
import { UserDetails } from './pages/UserDetails.js'

const App = () => {
  const {user}=useAuthContext()
  let designation
  let check=false
  if(user){
    designation=user.user.designation
    if(designation==="Teacher"){
      check=true
    }
  }
  return (
    <div className='App'>
      <BrowserRouter>
      <Navbar/>
        <div className='layout'>
            {user && <SideBar/>}
          <div className='pages'>
            <Routes>
              <Route path='/' element={user?<Home/>:<Navigate to="/login"/>}/>
              <Route path="/login" element={!user?<Login/>:<Navigate to='/'/>}/>
              <Route path="/signup" element={!user?<Signup/>:<Navigate to='/'/>}/>
              <Route path='/learn' element={check?<Navigate to='/addvideos'/>:<Learn/>}/>
              <Route path='/allvideos' element={<AllVid/>}/>
              <Route path='/alldocs' element={<AllDoc/>}/>
              <Route path='/mynotes' element={!check?<MyNotes/>:null}/>
              <Route path='/watch/:videoId' element={user?<VideoView/>:null}/>
              <Route path='/createtest' element={check?<CreateTest/>: null}/>
              <Route path='/mytests' element={check?<MyTests/>:null}/>
              <Route path='/userdetails' element={<UserDetails/>}/>
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




