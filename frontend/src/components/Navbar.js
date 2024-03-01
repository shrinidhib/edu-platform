import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header>
        <div className='container'>
            <Link to="/">
                <h1>Logo</h1>
            </Link>
            <nav>
                <div className='nav-items'>
                    <Link className='nav-link' to="/mynotes">Notes</Link>
                    <Link  className='nav-link' to="/createtest">Create Test</Link>
                </div>
            </nav>
        </div>
    </header>
    
  )
}
