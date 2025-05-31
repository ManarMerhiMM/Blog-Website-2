import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            setIsLoggedIn(!!localStorage.getItem("token"));
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return (
        <nav className='nav-bar'>
            <Link to="/">Home</Link>
            {isLoggedIn && <Link to="/dashboard">Dashboard</Link>}
            {!isLoggedIn && <Link to="/register">Register</Link>}
            {!isLoggedIn ? (
                <Link className='create' to="/login">Login</Link>
            ) : (
                <Link className='create' to="/logout">Logout</Link>
            )}
        </nav>
    );
}

export default Navbar;
