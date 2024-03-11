import { useAuthContext } from './useAuthContext'
import { useForumsContext } from './useForumsContext'
import { useNavigate } from 'react-router-dom'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchForums } = useForumsContext()
  const navigate=useNavigate();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchForums({ type: 'SET_FORUMS', payload: null })

    navigate('/login')
  }

  return { logout }
}