import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import './Auth.css';
import run from "./images/run.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleRegister = (e) => {
        e.preventDefault();

        if (password !== passwordConfirmation) {
            setError("Passwords do not match.");
            return;
        }

        if (!email.includes('@')) {
            setError("Please enter a valid email address.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        api.post('/register', {
            username,
            email,
            password,
            password_confirmation: passwordConfirmation
        })
        .then((response) => {
            setSuccessMessage("Registered Successfully");
            setError(null);
            setTimeout(() => {
                navigate('/login');
            }, 1000);
        })
        .catch((error) => {
            console.error("Registration error:", error.response?.data || error.message);
            if (error.response && error.response.data) {
                const errorMessages = Object.values(error.response.data).flat().join(", ");
                setError(errorMessages);
            } else {
                setError("Registration failed. Please try again.");
            }
            setSuccessMessage(null);
        });
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <div className="auth-container register-page">
            <div className="form-container">
                <h2>{isLoggedIn ? "You're already registered & logged in" : "Register"}</h2>

                {!isLoggedIn ? (
                    <form onSubmit={handleRegister}>
                        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

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

                        <div className="password-wrapper">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                required
                            />
                            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="eye-icon">
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>

                        <button type="submit">Register</button>
                    </form>
                ) : (
                    <button onClick={handleLogout}>Logout</button>
                )}

                {error && <p style={{ color: 'red' }}>{error}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

                {!isLoggedIn && (
                    <p style={{ marginTop: '15px', textAlign: 'center' }}>
                        Already registered? <Link to="/login" style={{ color: 'rgb(22, 30, 134)', fontWeight: 'bold' }}>Login</Link>
                    </p>
                )}
            </div>

            <div className="image-container">
                <img src={run} alt="Register" style={{ height: '400px', marginTop: "20px" }} />
            </div>
        </div>
    );
}

export default Register;
