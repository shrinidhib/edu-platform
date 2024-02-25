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
          <Route path='/' element={<Videos/>}/>
          <Route path='/mynotes' element={<MyNotes/>}/>
          <Route path='/watch/:videoId' element={<VideoView/>}/>
        </Routes>
      </div>
      </BrowserRouter>

      
    </div>
  );
}

export default App;
