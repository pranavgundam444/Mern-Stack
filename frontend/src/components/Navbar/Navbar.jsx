import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <Link to="/" className="navbar-brand">Mern</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                <Link to="/create" className="nav-link">Create Post</Link>
                </li>
                <li className="nav-item">
                <Link to="/all" className="nav-link">All Post</Link>
                </li>
            </ul>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
