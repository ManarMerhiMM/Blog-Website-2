import React from 'react'
import { Link } from 'react-router-dom';
import "./nav.css"

function Navbar(){
    return(
        <nav className='nav-bar'>
            <Link to="/">Home</Link>
            <Link  to="/create">Create</Link>
            <Link to="/register">Register</Link>
            <Link className='create' to="/login">Login</Link>
           
        </nav>
    )
}

export default Navbar;