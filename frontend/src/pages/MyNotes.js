import { useEffect } from "react"
import Note from "../components/Note/Note"
import { useNoteContext } from "../hooks/useNoteContext"
import { useAuthContext } from "../hooks/useAuthContext"

const MyNotes=()=>{
    const {notes,dispatch}=useNoteContext()
    const {user}=useAuthContext()


    useEffect(()=>{
        const fetchnotes=async()=>{
            const response=await fetch(`https://edu-frontend-sage.vercel.app/notes/${user.user._id}`,{
                method: "GET",
                headers:{
                    "Authorization":`Bearer ${user.token}`
                }
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
                    <Note key={note._id} note={note}/>
                )
            })}
        </div>
    )
   
}

export default MyNotes