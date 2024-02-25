import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MyNotes from './pages/MyNotes';
import { Videos } from './pages/Videos';
import { VideoView } from './pages/VideoView';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Navbar/>
      <div className='pages'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/mynotes' element={<MyNotes/>}/>
          <Route path='/video' element={<Videos/>}/>
          <Route path='/watch/:videoId' element={<VideoView/>}/>
        </Routes>
      </div>
      </BrowserRouter>

      
    </div>
  );
}

export default App;
