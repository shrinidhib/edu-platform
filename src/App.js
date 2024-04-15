import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';


import { PreviewTest } from './pages/PreviewTest';
import { Tests } from './pages/Tests';
import CreateTest from './pages/CreateTest';
import TakeTest from './pages/TakeTest';
import DisplayScores from './pages/DisplayScores';
import  {DisplayTests}  from './pages/DisplayTests';
import ViewAllScores from './pages/ViewAllScores';
import { UserDetails } from './pages/UserDetails';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Navbar/>
      <div className='pages'>
        <Routes>
          <Route path='/createtest' element={<CreateTest/>}/>
          <Route path='/tests' element={<Tests/>}/>
          <Route path='/displaytests' element={<DisplayTests/>}/>
          <Route path='/viewallscores/:testID' element={<ViewAllScores/>}/>
          <Route path='/userdetails/:userID' element={<UserDetails/>}/>
          <Route path='/taketest/:testID' element={<TakeTest/>}/>
          <Route path='/displayscores' element={<DisplayScores/>}/>
        </Routes>
      </div>
      </BrowserRouter>

      
    </div>
  );
}

export default App;