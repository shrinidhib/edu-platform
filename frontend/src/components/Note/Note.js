import { useState } from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import EditNote from '../EditNote/EditNote';
import './Note.css'

const Note=({note})=>{

    const [showNote,setShowNote]=useState(false)
    const [showEdit,setShowEdit]=useState(false)
    const modalHandler=()=>{
        setShowNote(!showNote)
    }

    const editHandler=()=>{
        console.log('edit')
        setShowEdit(!showEdit)
    }

    return (
        <div className='note'>
            <h1>{note.title}</h1>
            <p>{note.content.slice(0,30)}</p>
            <button className='read-btn' onClick={modalHandler}>Read More</button>

            {showEdit && <EditNote/>}
            {showNote && 
            <div  onClick={modalHandler} className='modal'>
                <div onClick={(e)=>{
                    e.stopPropagation()}}
                    className='modal-note' >
                        <div className='icons'>
                            <MdEdit onClick={editHandler} size={25}/>
                            <IoMdCloseCircle onClick={modalHandler} size={25}/>
                        </div>
                    <h1 className='modal-title'>{note.title}</h1>
                    <p className='modal-content'>{note.content}</p>
                </div>
            </div>}
            
        </div>
    )
}

export default Note