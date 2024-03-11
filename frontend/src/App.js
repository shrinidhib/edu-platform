import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext' // Import from correct path
import { useAuthContext } from './hooks/useAuthContext';
import {ForumsContextProvider} from './context/ForumContext'
import AllForums from './pages/AllForums';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import CreateForum from './pages/CreateForum';
import DisplayForum from './pages/DisplayForum';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* Wrap the entire app with AuthContextProvider */}
        <AuthContextProvider>
          <ForumsContextProvider>
            <Navbar />
            <div className="pages">
              <Routes>
                <Route
                  path="/"
                  element={<AllForums />} 
                />
                <Route
                  path="/login"
                  element={<Login />} 
                />
                <Route
                  path="/signup"
                  element={<Signup />} 
                />
                <Route
                  path="/createforum"
                  element={<CreateForum/>}
                />
                <Route
                  path="/forums/:forumID"
                  element={<DisplayForum/>}
                />
              </Routes>
            </div>
          </ForumsContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App