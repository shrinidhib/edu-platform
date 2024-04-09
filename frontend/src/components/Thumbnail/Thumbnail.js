import { Link } from 'react-router-dom'
import './Thumbnail.css'
import { useAuthContext } from '../../hooks/useAuthContext'

const Thumbnail = ({videoId,title}) => {
  const {user}=useAuthContext()
  const addItem=async(data)=>{
    const id=user.user._id
    console.log(id)
    const response=await fetch(`http://localhost:4005/users/update/${id}`,{
        method:"PUT",
        body: JSON.stringify({newItem:data}),
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${user.token}`
          
        }
    })
    const result=await response.json()}
  return (
    <div className='thumbnail-container'>
        <Link to={`/watch/${videoId}`}>
        <img className='thumbnail' src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} onClick={()=>{addItem({videoId,title})}}/>
        </Link>
        <p>{title}</p>
    </div>
  )
}

export default Thumbnail