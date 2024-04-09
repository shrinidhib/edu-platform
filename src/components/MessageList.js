import React, { useRef} from "react";
import { useEffect } from "react";

function MessageList({ messages, currentUser }) {
  const messageListRef=useRef(null)
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);
  
  return (
    <ul className="message-list" ref={messageListRef}>
      {messages.map((message) => (
        <li
          key={message._id}
          className={`message-item ${
            message.createdBy === currentUser.email ? "logged-in-message" : ""
          }`}
        >
          <div className="message-header">
            <p className="message-name">{message.createdBy}</p>
          </div>
          <div className="message-content">
            <p>{message.content}</p>
            <p className="message-meta">
              -{new Date(message.createdAt).toLocaleString()}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default MessageList;
