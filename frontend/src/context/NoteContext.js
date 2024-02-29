import { createContext, useReducer } from "react";

export const NoteContext=createContext()
export const noteReducer=(state,action)=>{
    switch (action.type){
        case 'SET_NOTES':
            return{
                notes: action.payload
            }
        case 'CREATE_NOTE':
            return {
                notes: [action.payload,...state.notes]
            }
        case 'DELETE_NOTE':
            return {
                notes: state.notes.filter((n)=>{
                    return n._id!=action.payload._id
                })
            }
        case 'UPDATE_NOTE':
            let newNotes=[]
            state.notes.forEach(n => {
                if (n._id===action.payload._id){
                    console.log(action.payload)

                    return newNotes.push(action.payload)
                }
                else{
                    return newNotes.push(n)
                }
                
            });
            

            console.log(newNotes)
            return {
                notes: newNotes
            }
        default:
            return state
    }
}

export const NoteContextProvider=({children})=>{
    const [state,dispatch]=useReducer(noteReducer,{
        notes: null
    })

    return (
        <NoteContext.Provider value={{...state,dispatch}}>
            {children}
        </NoteContext.Provider>
    )
}