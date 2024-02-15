import { useState } from 'react'
import { useNoteContext } from '../../hooks/useNoteContext'
import './EditNote.css'

const EditNote=({note, editHandler, modalHandler})=>{
    const [title,setTitle]=useState(note.title)
    const [content,setContent]=useState(note.content)
    const [error,setError]=useState('')
    const [empty,setEmpty]=useState([])
    const {dispatch}=useNoteContext()

    const submitEditHandler=async(e)=>{
        e.preventDefault()
        // const note={title,content}
        const edited_note={title,content}
        const response=await fetch(`http://localhost:4005/notes/${note._id}`,{
            method: 'PATCH',
            body: JSON.stringify(edited_note),
            headers:{
                'Content-type': 'application/json'
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
            dispatch({
                type: 'UPDATE_NOTE',
                payload: json
            })
            modalHandler()
            editHandler()
        }
    }
    return (
        <div className='edit-modal'>
            <form className='edit-note-form' onSubmit={submitEditHandler}>
                <label>Note Title: </label>
                <input
                    type="text"
                    onChange={(e)=>setTitle(e.target.value)}
                    value={title}
                    className={empty.includes('title')? "error edit-title": 'edit-title'}
                    />
                <label>Content: </label>
                <textarea
                    type="text"
                    onChange={(e)=>setContent(e.target.value)}
                    value={content}
                    className={empty.includes('content')? "error edit-content": 'edit-content'}
                    maxLength="1500"
                    />

                <button type="submit">Save and Close note</button>
                {error && <div className='error'>{error}</div>}
            </form>
        </div>
        
    )

}

export default EditNote