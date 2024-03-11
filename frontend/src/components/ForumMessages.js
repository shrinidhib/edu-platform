import {useForumsContext} from "../hooks/useForumsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import MessageList from "./MessageList"

const ForumMessages=({forum})=>{
    const {dispatch}=useForumsContext()
    const {user}=useAuthContext()

    return (
        <div>
          {forum && (
            <div>
              <h2>{forum.title}</h2>
              <p>{forum.description}</p>
              {/* ... other forum details */}
              {forum.messages && <MessageList messages={forum.messages} />}
            </div>
          )}
          {!forum && <p>Loading forum details...</p>}
        </div>
      );
      
}
export default ForumMessages
  