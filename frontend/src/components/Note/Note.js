import { useState } from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNoteContext } from '../../hooks/useNoteContext';
import EditNote from '../EditNote/EditNote';
import './Note.css'
import { useAuthContext } from '../../hooks/useAuthContext';

const Note=({note})=>{

    const [showNote,setShowNote]=useState(false)
    const [showEdit,setShowEdit]=useState(false)
    const {dispatch} = useNoteContext()
    const {user}=useAuthContext()
    const modalHandler=()=>{
        console.log('modal handler')
        setShowNote(!showNote)
    }

    const editHandler=()=>{
        setShowNote(!showNote)
        setShowEdit(!showEdit)
    }
    
    const deleteHandler=async()=>{
        const isConfirmed = window.confirm("Are you sure you want to delete this note?")

        if (isConfirmed){
            const response=await fetch(`https://edu-backend-mu.vercel.app/notes/${note._id}`,{
            method: 'DELETE',
            body: JSON.stringify(note),
            headers:{
                'Content-type': 'application/json',
                "Authorization":`Bearer ${user.token}`
                
            }
            })
            const json =await response.json()
            dispatch({
                type: 'DELETE_NOTE',
                payload: json
            })



        }

        

        
    }

    return (
        <div className='note'>
            <h1>{note.title}</h1>
            <p>{note.content.slice(0,30)}...</p>
            <button className='read-btn' onClick={modalHandler}>Read More</button>
            <MdDelete onClick={deleteHandler} className='delete' size={25}/>

            {showEdit && <EditNote note={note} editHandler={editHandler} modalHandler={modalHandler}/>}
            
            {showNote && 
            <div  onClick={modalHandler} className='modal-container'>
                
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