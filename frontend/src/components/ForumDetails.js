import {useForumsContext} from "../hooks/useForumsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ForumDetails = ({forum})=>{
    const {dispatch} = useForumsContext()
    const {user} = useAuthContext()
    const navigate=useNavigate();

    const handleForumClick=()=>{
        navigate(`/forums/${forum._id}`)
    }

    return(
        <div className="forum-details">
            <button className="displaybutton" onClick={handleForumClick}> <h4>{forum.title}</h4></button>
            <p><strong>Description:</strong>{forum.description}</p>
            <p><strong>Created by:</strong>{forum.createdBy}</p>
            <p>{formatDistanceToNow(new Date(forum.createdAt), { addSuffix: true })}</p>
        </div>
    )
}

export default ForumDetails