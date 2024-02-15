import { useEffect } from "react"
import Note from "../components/Note/Note"
import { useNoteContext } from "../hooks/useNoteContext"

const MyNotes=()=>{
    const {notes,dispatch}=useNoteContext()

    useEffect(()=>{
        const fetchnotes=async()=>{
            const response=await fetch('http://localhost:4005/notes/',{
                method: "GET",
            })
            const json=await response.json()
            if (response.ok){
                dispatch({
                    type: 'SET_NOTES',
                    payload: json
                })
            }
        }

        fetchnotes()
    },[dispatch])
    return (
         <div className="mynotes">
            {notes && notes.map((note)=>{
                return (
                    <Note note={note}/>
                )
            })}
        </div>
    )
   
}

export default MyNotes