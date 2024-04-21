import { useState, useEffect, useCallback } from "react";
import { useForumsContext } from "../hooks/useForumsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import io from 'socket.io-client';

const MessageForm = ({ currentUser, currentID, onMessageSent }) => { // Added onMessageSent prop
    const { dispatch } = useForumsContext();
    const [content, setContent] = useState("");
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const { token } = useAuthContext();

    const handleSubmit = useCallback(async (e) => {
      e.preventDefault();
  
      const username = currentUser.user.username;
      console.log(currentUser) // Use the email from currentUser prop
      const forumID = currentID; // Use the forumID prop
  
      if (!username) {
        setError("You must be logged in");
        return;
      }
  
      const message = { content, createdBy: username, forumID };
  
      const response = await fetch("http://localhost:4005/forums/messages", {
        method: "POST",
        body: JSON.stringify(message),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Assuming user.token exists for authentication
        },
      });
  
      const json = await response.json();
  
      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      } else {
        setContent("");
        setError(null);
        setEmptyFields([]);
        dispatch({ type: "CREATE_MESSAGE", payload: json });
        onMessageSent(json); // Invoke the callback function with the new message
      }
    }, [content, currentUser, currentID, dispatch, token, onMessageSent]);

    useEffect(() => {
        const socket = io('http://localhost:4005/');

        socket.emit('message', 'Hello');

        socket.on('message', (message) => {
            console.log("Received Message: ", message);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
      <form className="create" onSubmit={handleSubmit}>
          <label>Add Message:</label>
          <input
              type="text"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className={emptyFields.includes("content") ? "error" : ""}
          />
          <button>Send Message</button>
          {error && <div className="error">{error}</div>}
      </form>
  );
};

export default MessageForm;