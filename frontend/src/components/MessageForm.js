import { useState } from "react";
import { useForumsContext } from "../hooks/useForumsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import io from 'socket.io-client'

const MessageForm = ({ currentUser, currentID }) => {
  const { dispatch } = useForumsContext();

  const [content, setContent] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    //e.preventDefault();

    const username = currentUser.email; // Use the email from currentUser prop
    const forumID = currentID; // Use the forumID prop

    if (!username) {
      setError("You must be logged in");
      return;
    }

    const message = { content, createdBy: username, forumID };

    const response = await fetch("/api/forums/messages", {
      method: "POST",
      body: JSON.stringify(message),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.token}`, // Assuming user.token exists for authentication
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
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      {/* <h3>Add a New Message</h3> */}

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
