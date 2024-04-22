// import React, { useEffect, useState, useRef, useCallback } from "react";
// import { useParams } from "react-router-dom";
// import { useAuthContext } from "../hooks/useAuthContext";
// import MessageList from "../components/MessageList";
// import MessageForm from "../components/MessageForm";
// import { FaArrowDown } from "react-icons/fa";

// const DisplayForum = () => {
//   const { user } = useAuthContext();
//   const { forumID } = useParams();
//   const [forumData, setForumData] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const messagebox = useRef(null);
//   const [first,setFirst]=useState(true)
//   const [scrolledToBottom, setScrolledToBottom] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`https://edu-backend-mu.vercel.app/forums/${forumID}`, {
//           headers: { Authorization: `Bearer ${user.token}` },
//         });
//         if (!response.ok) {
//           throw new Error("Failed to fetch forum data");
//         }
//         const data = await response.json();
//         setForumData(data.forum);
//          // Set forum data
//          console.log(data.messages)
//          if (first || data.messages.slice(-1).content!=messages.slice(-1).content){
//           setMessages(data.messages);
//           setFirst(false)
//          }
//          // Set messages
//       } catch (error) {
//         console.error("Error fetching forum data:", error.message);
//       }
//     };

//     if (user) {
//       const polling=setInterval(fetchData, 2000);
//       return () => clearInterval(polling);
//     }
//   }, [user, forumID, first]);

//   const scrollToBottom = useCallback(() => {
//     if (messagebox.current) {
//       messagebox.current.scrollIntoView({ behavior: "smooth" });
//       setScrolledToBottom(true);
//     }
//   }, []);

//   const handleMessageSent = useCallback((newMessage) => {
//     console.log(1)
//     setMessages(prevMessages => [...prevMessages, newMessage]); // Update messages state with new message
//   }, []);

//   useEffect(() => {
//     if (!scrolledToBottom && messages.length > 0) {
//       scrollToBottom();
//     }
//   }, [messages]);

//   return (
//     <div className="displayforum" id="displayforum">
//       {user ? (
//         <>
//           <div className="forum-header">
//             {forumData && (
//               <>
//                 <h2>{forumData.title}</h2>
//                 <p>{forumData.description}</p>
//               </>
//             )}
//             {!forumData && (
//               <div>Getting Details</div>
//             )}
//           </div>
//           {messages.length > 0 && <MessageList messages={messages} currentUser={user} />}
//           <div ref={messagebox}></div>
//           <MessageForm currentUser={user} currentID={forumID} onMessageSent={handleMessageSent} />
//           <button onClick={scrollToBottom} className="scroll-button">
//             <FaArrowDown/>
//           </button>
//         </>
//       ) : (
//         <p>Please log in to view messages and leave comments.</p>
//       )}
//     </div>
//   );
// };

// export default DisplayForum;




import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import MessageList from "../components/MessageList";
import MessageForm from "../components/MessageForm";
import { FaArrowDown } from "react-icons/fa";

const DisplayForum = () => {
  const { user } = useAuthContext();
  const { forumID } = useParams();
  const [forumData, setForumData] = useState(null);
  const [messages, setMessages] = useState([]);
  const messagebox = useRef(null);
  const [scrolledToBottom, setScrolledToBottom] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`https://edu-backend-mu.vercel.app/forums/${forumID}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch forum data");
      }
      const data = await response.json();
      setForumData(data.forum);
      if (areMessagesDifferent(data.messages, messages)) {
        // Only update messages if new messages are received
        setMessages(data.messages);
        if (!scrolledToBottom) {
          scrollToBottom();
        }
      }
    } catch (error) {
      console.error("Error fetching forum data:", error.message);
    }
  }, [forumID, user.token, messages, scrolledToBottom]);

  useEffect(() => {
    if (user) {
      const polling = setInterval(fetchData, 2000);
      return () => clearInterval(polling);
    }
  }, [user, fetchData]);

  const areMessagesDifferent = (newMessages, oldMessages) => {
    if (newMessages.length !== oldMessages.length) return true;
    for (let i = 0; i < newMessages.length; i++) {
      if (newMessages[i].content !== oldMessages[i].content) return true;
    }
    return false;
  };

  const scrollToBottom = useCallback(() => {
    if (messagebox.current) {
      messagebox.current.scrollIntoView({ behavior: "smooth" });
      setScrolledToBottom(true);
    }
  }, []);

  const handleMessageSent = useCallback((newMessage) => {
    setMessages(prevMessages => [...prevMessages, newMessage]);
  }, []);

  const handleScrollButtonClick = () => {
    scrollToBottom();
  };

  return (
    <div className="displayforum" id="displayforum">
      {user ? (
        <>
          <div className="forum-header">
            {forumData ? (
              <>
                <h2>{forumData.title}</h2>
                <p>{forumData.description}</p>
              </>
            ) : (
              <div>Getting Details</div>
            )}
          </div>
          {messages.length > 0 && <MessageList messages={messages} currentUser={user} />}
          <div ref={messagebox}></div>
          <MessageForm currentUser={user} currentID={forumID} onMessageSent={handleMessageSent} />
          {/* <button onClick={handleScrollButtonClick} className="scroll-button">
            <FaArrowDown/>
          </button> */}
        </>
      ) : (
        <p>Please log in to view messages and leave comments.</p>
      )}
    </div>
  );
};

export default DisplayForum;