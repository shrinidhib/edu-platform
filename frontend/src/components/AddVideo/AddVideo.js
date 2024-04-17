import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext.js'
import { useVideoContext } from '../../hooks/useVideoContext.js'
import {useEffect} from 'react'
import { FaRegTrashCan } from "react-icons/fa6";

import axios from 'axios'

const AddVideo = () => {
    const {videos,dispatch}=useVideoContext()
    const {user}=useAuthContext()
    const [inputUrl,setInputUrl]=useState('')
    const [title,setTitle]=useState('')
    const [title2,setTitle2]=useState('')
    const [file,setFile]=useState('')
    const [error,setError]=useState(null)
    const [allImage, setAllImage] = useState([]);
    

    const deleteDoc=async(id)=>{
        const response = await axios.delete(
            `https://edu-backend-mu.vercel.app/docs/deletedoc/${id}`
        );
        if(response.data.status==='ok'){
            getPdf()
        }
    }
    const getPdf = async () => {
        const result = await axios.get(`https://edu-backend-mu.vercel.app/docs/filter/${user.user._id}`);
        console.log(result.data.docs);
        setAllImage(result.data.docs);
    };
    const showPdf = (pdf) => {
        window.open(`https://edu-backend-mu.vercel.app/files/${pdf}`, "_blank", "noreferrer");
        // setPdfFile(`http://localhost:5000/files/${pdf}`)
    };
    useEffect(() => {
        if(user){
            getPdf();
        }
      }, [user]);
    const addDocHandler=async(e)=>{
        e.preventDefault()
        const formdata=new FormData()
        formdata.append("title",title2)
        formdata.append("file",file)
        formdata.append("teacher_id",user.user._id)
        console.log(formdata)

        const response = await axios.post(
            "https://edu-backend-mu.vercel.app/docs/upload-files",
            formdata,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
        );
        if (response.data.status === "ok") {
            alert("Uploaded Successfully!!!");
            getPdf();
            setFile('')
            setTitle2('')
          }
          else{
            setError(response.data.status)
          }
        console.log("res:",response)
    }
    const addVideoHandler=async(e)=>{
        e.preventDefault()
        const pattern = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\S+)?$/;
        const isValid = pattern.test(inputUrl); 

        if (!isValid){
            window.alert('Please enter a valid video url')
        }
        else{
            setError(null)
            const url=inputUrl
            const video={url,title,teacher_id:user.user._id}
            const response= await fetch('https://edu-backend-mu.vercel.app/videos/addvideos',{
                method: 'POST',
                body: JSON.stringify(video),
                headers:{
                    'Content-type': 'application/json',
                    "Authorization":`Bearer ${user.token}`
                }
            })
            const json=await response.json()
            if (!response.ok){
                setError(json.error)
                console.log(error)
            }
            else{
                setInputUrl('')
                setTitle('')
                setError(null)
                dispatch({type:"ADD_VIDEO",payload:json})
            }
        }
    }
  return (
    <>
    <form onSubmit={addVideoHandler}>
        <input 
        type='text' 
        placeholder='Add video url' 
        value={inputUrl} 
        onChange={(e)=>setInputUrl(e.target.value)}
        />
        <input type='text' placeholder='Add Title' value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
        <button >Submit</button>
        {error && <div>An error occurred while uploading. Try again</div>}
    </form>
    { allImage.length!==0 && <div>
        <br/>
          <h3>Your Docs</h3>
          <div className="your_docs doc-list-outer">
          {allImage === null
            ? ""
            : allImage.map((data) => {
                return (
                  <div className="doc-cont">
                    <h6>Title: {data.title}</h6>
                    <div className='doc-btn-cont'>
                    <button
                      className="doc-btn"
                      onClick={() => showPdf(data.file)}
                    >
                      View Pdf
                    </button>
                    <FaRegTrashCan onClick={()=>{deleteDoc(data._id)}}/>
                    </div>
                  </div>
                );
              })}
            </div>
        </div>}
    <form onSubmit={addDocHandler} encType='multipart/form-data'>
        <input type="file" filename="file" accept='application/pdf' onChange={(e)=>{setFile(e.target.files[0])}} required/>
        <input type='text' placeholder='Add Title' value={title2} onChange={(e)=>{setTitle2(e.target.value)}} required/>
        <button >Submit</button>
        {error && <div>An error occurred while uploading. Try again</div>}
    </form>
    </>
  )
}
export default AddVideo
