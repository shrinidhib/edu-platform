import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MyNotes from './pages/MyNotes';
import { Video } from './pages/Video';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Navbar/>
      <div className='pages'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/mynotes' element={<MyNotes/>}/>
          <Route path='/video' element={<Video/>}/>
        </Routes>
      </div>
      </BrowserRouter>

      
    </div>
  );
}

export default App;
