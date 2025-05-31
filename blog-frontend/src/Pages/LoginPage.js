import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import './Auth.css';
import messy from "./images/messy.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }

        api.post('/login', { email, password })
            .then((response) => {
                setSuccessMessage("Login successful!");
                setError(null);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("userEmail", response.data.email); 
                setIsLoggedIn(true);
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            })
            .catch((error) => {
                console.error("Login error:", error);
                if (error.response && error.response.data) {
                    const errorMessages = Object.values(error.response.data).flat().join(", ");
                    setError(errorMessages);
                } else {
                    setError("Login failed. Please check your credentials and try again.");
                }
                setSuccessMessage(null);
            });
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail"); 
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <div className="auth-container login-page">
            <div className="image-container">
                <img src={messy} alt="Login" />
            </div>
            <div className="form-container">
                <h2>{isLoggedIn ? "You're already logged in" : "Login"}</h2>

                {!isLoggedIn ? (
                    <form onSubmit={handleLogin}>
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span onClick={() => setShowPassword(!showPassword)} className="eye-icon">
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <button type="submit">Login</button>
                    </form>
                ) : (
                    <button onClick={handleLogout}>Logout</button>
                )}

                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                {!isLoggedIn && (
                    <p style={{ marginTop: '15px', textAlign: 'center' }}>
                        Don’t have an account?{" "}
                        <Link to="/register" style={{ color: 'rgb(22, 30, 134)', fontWeight: 'bold' }}>Register</Link>
                    </p>
                )}
            </div>
        </div>
    );
}

export default Login;
