import { useEffect} from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import {useForumsContext} from "../hooks/useForumsContext";
 
import ForumForm from "../components/ForumForm"

const CreateForum= ()=>{
    return (
        <div className="createforum">
            <ForumForm/>
        </div>
    )
}

export default CreateForum