import { useContext } from "react"
import { NoteContext } from "../context/NoteContext"

export const useNoteContext=()=>{
    const context=useContext(NoteContext)

    if (!context){
        throw Error('Used out of note context')
    }
    return context
}