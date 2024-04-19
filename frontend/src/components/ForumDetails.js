
import { useNavigate } from "react-router-dom"

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ForumDetails = ({forum})=>{

    const navigate=useNavigate();

    const handleForumClick=()=>{
        navigate(`/forums/${forum._id}`)
    }

    return(
        <div className="forum-details">
            <h2 onClick={handleForumClick}>{forum.title}</h2>
            <p><strong>Description: </strong>{forum.description}</p>
            <p><strong>Created by: </strong>{forum.createdBy}</p>
            <p>{formatDistanceToNow(new Date(forum.createdAt), { addSuffix: true })}</p>
        </div>
    )
}

export default ForumDetails