import { useState } from 'react'
import Draggable from 'react-draggable'
import './Noteform.css'


const NoteForm=({toggleModal})=>{
    const [title,setTitle]=useState('')
    const [content,setContent]=useState('')
    const [error,setError]=useState('')
    const [empty,setEmpty]=useState([])

    const submitHandler=async(e)=>{
        e.preventDefault()

        const note={title,content}
        const response=await fetch("http://localhost:4005/notes/",{
            method: 'POST',
            body: JSON.stringify(note),
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
                    className={empty.includes('title')? "error": ''}
                    />
                <label>Content: </label>
                <textarea
                    type="text"
                    onChange={(e)=>setContent(e.target.value)}
                    value={content}
                    className={empty.includes('content')? "error content": 'content'}
                    maxLength="1500"
                    />

                <button type="submit">Save and Close note</button>
                {error && <div className='error'>{error}</div>}
            </form>
        </Draggable>
    )
}
export default NoteForm
