import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci';

const AllDoc = () => {
  const [allImage, setAllImage] = useState(null);
  const [title,setTitle]=useState("")
  const handleSearch=async(e)=>{
      e.preventDefault()
      const result = await axios.get(`http://localhost:4005/docs/search/${title}`);
      console.log(result.data.docs);
      setAllImage(result.data.docs);
      setTitle('')   
  }
  const getPdf = async () => {
      const result = await axios.get("http://localhost:4005/docs/get-files");
      console.log(result.data.docs);
      setAllImage(result.data.docs);
  };
  const showPdf = (pdf) => {
      window.open(`http://localhost:4005/files/${pdf}`, "_blank", "noreferrer");
      // setPdfFile(`http://localhost:5000/files/${pdf}`)
  };
  useEffect(() => {
    getPdf();
  }, []);
  return (
    <div>
        <form className='search' onSubmit={handleSearch}>
            <button type='submit'>
                <CiSearch size={20}/>
            </button>
            <input type='text' placeholder='Search' onChange={(e)=>setTitle(e.target.value)} value={title}/>
        </form>
      <div className='doc-div'>
      {allImage == null
        ? ""
        : allImage.map((data) => {
            return (
              <div className="doc-cont">
                <h6>Title: {data.title}</h6>
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