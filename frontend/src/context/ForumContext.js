import { createContext, useReducer } from 'react'

export const ForumsContext = createContext()

export const forumsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FORUMS':
      return { 
        forums: action.payload 
      }
    case 'CREATE_MESSAGE':
      return{
        forums:[action.payload]
      }
    case 'CREATE_FORUM':
      return { 
        forums: [action.payload, ...state.forums] 
      }
    case 'DELETE_FORUM':
      return { 
        forums: state.forums.filter(f => f._id !== action.payload._id) 
      }
    default:
      return state
  }
}

export const ForumsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(forumsReducer, { 
    forums: null
  })
  
  return (
    <ForumsContext.Provider value={{ ...state, dispatch }}>
      { children }
    </ForumsContext.Provider>
  )
}