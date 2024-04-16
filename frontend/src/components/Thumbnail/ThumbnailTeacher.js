import { Link } from 'react-router-dom'
import { FaRegTrashCan } from "react-icons/fa6";
import { useVideoContext } from '../../hooks/useVideoContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import './Thumbnail.css'

const ThumbnailTeacher = ({videoId,title,id}) => {
    const {dispatch}=useVideoContext()
    const {user}=useAuthContext()
    const handleDelete=async()=>{
        const response=await fetch(`http://localhost:4005/videos/removevideo/${id}`,{
            method:"DELETE",
            headers:{
                "Authorization":`Bearer ${user.token}`
            }
        })
        const result=await response.json()
        if(response.ok){
            dispatch({type:"DELETE_VIDEO",payload:result})
            console.log("deleted")
        }
        else{
            console.log("error")
        }
    }
  return (
    <div className='thumbnail-container'>
        <Link to={`/watch/${videoId}`}>
        <img className='thumbnail' src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} alt='thumbnail'/>
        </Link>
        <div className='teacher-control'>
            {title}
            <FaRegTrashCan style={{cursor:'pointer'}} size={22} onClick={handleDelete}/>
        </div>
    </div>
  )
}

export default ThumbnailTeacher