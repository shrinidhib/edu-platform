import { useState } from "react"
import { useForumsContext } from '../hooks/useForumsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from "react-router-dom"

const ForumForm = () => {
  const { dispatch } = useForumsContext()
  const { user } = useAuthContext()
  const navigate=useNavigate();

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [createdBy, setCreatedBy] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    

    if (!user) {
      e.preventDefault();
      setError('You must be logged in')
      return
    }
    


    const forum = {title, description, createdBy}

    const response = await fetch('/api/forums', {
      method: 'POST',
      body: JSON.stringify(forum),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      e.preventDefault();
      setTitle('')
      setDescription('')
      setCreatedBy('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_FORUM', payload: json})
      navigate('/')
    }
    
    
  }

  return (
    
      <form className="createforum" onSubmit={handleSubmit}>
        <h3>Add a New Forum</h3>

        <label>Forum Title:</label>
        <input 
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes('title') ? 'error' : ''}
        />

        <label>Description:</label>
        <input 
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className={emptyFields.includes('description') ? 'error' : ''}
        />

        <label>Created By:</label>
        <input 
          type="text"
          onChange={(e) => setCreatedBy(e.target.value)}
          value={createdBy}
          className={emptyFields.includes('createdBy') ? 'error' : ''}
        />

        <button>Add Forum</button>
        {error && <div className="error">{error}</div>}
      </form>
    
  );
};

export default ForumForm