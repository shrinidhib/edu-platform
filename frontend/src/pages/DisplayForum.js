import { useEffect, useState, useRef,useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import MessageList from "../components/MessageList";
import MessageForm from "../components/MessageForm";

const DisplayForum = () => {
  const { user } = useAuthContext();
  const { forumID } = useParams();
  const [forumData, setForumData] = useState(null);
  const [messages, setMessages] = useState([]);
  const messagebox = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4005/forums/${forumID}`, {
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
  }, [forumID, user]);

  const scrollToBottom = () => {
    if (messagebox.current) {
      messagebox.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMessageSent = useCallback((newMessage) => {
    setMessages(prevMessages => [...prevMessages, newMessage]); // Update messages state with new message
  }, []);

  return (
    <div className="displayforum" id="displayforum">
      {user ? (
        <>
          {messages.length > 0 && <MessageList messages={messages} currentUser={user} />}
          <div ref={messagebox}></div>
          <MessageForm currentUser={user} currentID={forumID} onMessageSent={handleMessageSent} />
          <button onClick={scrollToBottom} className="scroll-button">
            Scroll to Bottom
          </button>
        </>
      ) : (
        <p>Please log in to view messages and leave comments.</p>
      )}
    </div>
  );
};

export default DisplayForum;