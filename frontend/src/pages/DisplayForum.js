import { useContext, useEffect, useState,useRef } from "react";
import { useParams } from "react-router-dom";
import { useForumsContext } from "../hooks/useForumsContext";
import { useAuthContext } from "../hooks/useAuthContext";

import ForumDetails from "../components/ForumDetails";
import MessageList from "../components/MessageList";
import MessageForm from "../components/MessageForm";


const DisplayForum = () => {
  const { forum, dispatch } = useForumsContext();
  const { user } = useAuthContext();
  const { forumID } = useParams();
  const [forumData, setForumData] = useState(null);
  const [messages, setMessages] = useState([]);
  const messagebox = useRef(null)
  
  function increaseHeight(){
    if (messagebox.current) {
      // Scroll to the bottom of the div when messages update
      messagebox.current.scrollTop = messagebox.current.scrollHeight;
    }
  }
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch(`https://edu-frontend-sage.vercel.app/forums/${forumID}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch forum data");
        }
        const data = await response.json();
        setForumData(data.forum); // Set forum data
        setMessages(data.messages); // Set messages
        


      } catch (error) {
        console.error("Error fetching forum data:", error.message);
      }
    };

    if (user) {
      fetchData();
    }

  }, [forumID, user, forumData]);
  useEffect(() => {
    if (messagebox.current) {
      messagebox.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages,messagebox]);

  return (
    
    <div className="displayforum" id="displayforum">
      
      {user ? (
        <>
          {messages.length > 0 && <MessageList messages={messages} currentUser={user}   />}
          <div ref={messagebox}></div>
          <MessageForm currentUser={user} currentID={forumID} increaseHeight={increaseHeight} />
        </>
      ) : (
        <p>Please log in to view messages and leave comments.</p>
      )}
    </div>

  );
  
};

export default DisplayForum;
