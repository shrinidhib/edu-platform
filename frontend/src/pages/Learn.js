import React,{useEffect,useState} from 'react'
import { useAuthContext } from '../hooks/useAuthContext.js'
import Thumbnail from '../components/Thumbnail/Thumbnail.js'
import { useVideoContext } from '../hooks/useVideoContext.js'
import { Link } from 'react-router-dom'
import './css/Learn.css'
import './css/Home.css'
import axios from 'axios'

const Learn = () => {
    const {user}=useAuthContext()
    const {videos,dispatch}=useVideoContext()
    const [allImage, setAllImage] = useState(null);
    const getPdf = async () => {
        const result = await axios.get("https://edu-backend-mu.vercel.app/docs/get-files");
        console.log(result.data.docs);
        setAllImage(result.data.docs);
    };
    const showPdf = (pdf) => {
        window.open(`https://edu-backend-mu.vercel.app/files/${pdf}`, "_blank", "noreferrer");
        // setPdfFile(`http://localhost:5000/files/${pdf}`)
    };
    useEffect(()=>{
        const fetchVideos=async()=>{
            const response= await fetch('https://edu-backend-mu.vercel.app/videos/all',{
                method: 'GET',
            })
            const json=await response.json()
            // console.log(json)
            if (response.ok){
                dispatch({type:"SET_VIDEOS",payload:json})
            }
            else{
                console.log('error')
            }
        }
        if(user){
            fetchVideos()
            getPdf()
        }
    },[user,dispatch])

    const fetchVideoId=(video)=>{
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = video.url.match(regex);
        if (match && match[1]) {
            return match[1];
        } else {
            return null;
        }
    }

  return (// copied from home
    <div className='learn'> 
        <Link to='/alldocs'>
            <div className='recent'>
                <h3>Docs</h3>
                <div className='recent-box'>
                {allImage == null
                    ? ""
                    : allImage.map((data) => {
                        return (
                        <div className="doc-cont">
                            <h6>Title: {data.title}</h6>
                            <button
                            className="doc-btn"
                            onClick={() => showPdf(data.file)}
                            >
                            View Pdf
                            </button>
                        </div>
                        );
                    })}
                </div>
            </div>
        </Link>
        <Link to='/allvideos'>
            <div className='recent'>
                <h3>Videos</h3>
                <div className='recent-box'>
                    {videos && videos.length!==0 && videos.map((vid)=>{
                        const videoId=fetchVideoId(vid)
                        return <Thumbnail key={videoId} title={vid.title} videoId={videoId}/>
                    })}
                </div>
            </div>
        </Link>
    </div>
  )
}

export default Learn