import { Link } from 'react-router-dom'
import './Thumbnail.css'

const Thumbnail = ({videoId}) => {
  return (
    <div className='thumbnail-container'>
        <Link to={`/watch/${videoId}`}>
        <img className='thumbnail' src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}/>
        </Link>
    </div>
  )
}

export default Thumbnail