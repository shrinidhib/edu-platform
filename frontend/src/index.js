import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { NoteContextProvider } from './context/NoteContext';
import VideoContextProvider from './context/VideoContext';
import AuthContextProvider from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <VideoContextProvider>
       <NoteContextProvider>
        <App />
    </NoteContextProvider>
    </VideoContextProvider>
    </AuthContextProvider>
   
  </React.StrictMode>
);


