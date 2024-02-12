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
                <div>
                    <Link to="/">Notes</Link>
                </div>
            </nav>
        </div>
    </header>
    
  )
}
