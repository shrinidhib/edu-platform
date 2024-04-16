import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { NoteContextProvider } from './context/NoteContext';
import VideoContextProvider from './context/VideoContext';
import AuthContextProvider from './context/AuthContext';
import { ForumsContextProvider } from './context/ForumContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <VideoContextProvider>
       <NoteContextProvider>
        <ForumsContextProvider>
        <App />
        </ForumsContextProvider>
    </NoteContextProvider>
    </VideoContextProvider>
    </AuthContextProvider>
   
  </React.StrictMode>
);


