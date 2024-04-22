import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci';

const AllDoc = () => {
  const [allImage, setAllImage] = useState(null);
  const [title,setTitle]=useState("")
  const handleSearch=async(e)=>{
      e.preventDefault()
      const result = await axios.get(`https://edu-backend-mu.vercel.app/docs/search/${title}`);
      console.log(result.data.docs);
      setAllImage(result.data.docs);
      setTitle('')   
  }
  const getPdf = async () => {
      const result = await axios.get("https://edu-backend-mu.vercel.app/docs/get-files");
      console.log(result.data.docs);
      setAllImage(result.data.docs);
  };
  const showPdf = (pdf) => {
      window.open(`https://edu-backend-mu.vercel.app/files/${pdf}`, "_blank", "noreferrer");
      // setPdfFile(`http://localhost:5000/files/${pdf}`)
  };
  useEffect(() => {
    getPdf();
  }, []);
  return (
    <div>
        <form className='search' onSubmit={handleSearch}>
            <label type='submit'>
                <CiSearch size={20}/>
            </label>
            <input type='text' placeholder='Search' onChange={(e)=>setTitle(e.target.value)} value={title}/>
        </form>
      <div className='doc-div'>
      {allImage == null
        ? ""
        : allImage.map((data) => {
            return (
              <div className="doc-cont">
                <h6>Title: {data.title}</h6>
                <div className='lines'>
                        <div className='line'></div>
                        <div className='line'></div>
                        <div className='line'></div>
                        <div className='line'></div>
                        <div className='line'></div>
                        <div className='line'></div>
                        <div className='line'></div>
                    </div>
                <button
                  className="btn-doc"
                  onClick={() => showPdf(data.file)}
                >
                  View Pdf
                </button>
              </div>
            );
          })}
    </div>
  </div>
  )
}

export default AllDoc