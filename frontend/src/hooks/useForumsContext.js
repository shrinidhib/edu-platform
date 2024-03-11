import {ForumsContext} from '../context/ForumContext'
import {useContext} from "react"

export const useForumsContext = () => {
    const context = useContext(ForumsContext)
  
    if(!context) {
      throw Error('useForumsContext must be used inside an ForumsContextProvider')
    }
  
    return context
  }