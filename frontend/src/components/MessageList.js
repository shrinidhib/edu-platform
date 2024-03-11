import React from "react";

function MessageList({ messages, currentUser }) {
  return (
    <ul className="message-list">
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
