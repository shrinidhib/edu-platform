import { useState } from 'react'
import Draggable from 'react-draggable'
import './Noteform.css'
import { useAuthContext } from '../../hooks/useAuthContext'


const NoteForm=({toggleModal})=>{
    const [title,setTitle]=useState('')
    const [content,setContent]=useState('')
    const [error,setError]=useState('')
    const [empty,setEmpty]=useState([])

    const {user}=useAuthContext()

    const submitHandler=async(e)=>{
        e.preventDefault()

        const note={title,content}
        const response=await fetch(`https://edu-frontend-sage.vercel.app/notes/${user.user._id}`,{
            method: 'POST',
            body: JSON.stringify(note),
            headers:{
                'Content-type': 'application/json',
                "Authorization":`Bearer ${user.token}`
                
            }
        })
        const json=await response.json()
        if (!response.ok){
            setError(json.error)
            setEmpty(json.emptyFields)
        }
        else{
            setTitle('')
            setContent('')
            setError(null)
            setEmpty([])
            toggleModal()

        }
    }
    return (
        <Draggable>
            <form className='note-form' onSubmit={submitHandler}>
                <label>Note Title: </label>
                <input
                    type="text"
                    onChange={(e)=>setTitle(e.target.value)}
                    value={title}
                    className={empty && empty.includes('title')? "error": ''}
                    />
                <label>Content: </label>
                <textarea
                    type="text"
                    onChange={(e)=>setContent(e.target.value)}
                    value={content}
                    className={empty && empty.includes('content')? "error content": 'content'}
                    maxLength="1500"
                    />
                <div className='options'>
                <button type="submit">Save and Close note</button>
                <button className='cancel-btn' onClick={toggleModal}>Cancel</button>
                </div>
                {error && <div className='error'>{error}</div>}
            </form>
        </Draggable>
    )
}
export default NoteForm
