import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import './AuthForm.css';

function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:3000/signup", { name, email, password })
            .then((result) => {
                if (result.status === 201) {
                    window.alert("User registered successfully.");
                    navigate("/signin");
                }
            })
            .catch((err) => {
                if (err.response && err.response.status === 400) {
                    window.alert("Email already exists. Please use a different email.");
                } else {
                    console.log(err);
                }
            });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/signin", { email, password }, { withCredentials: true })
            .then(response => {
                if (response.data === "Success") {
                    window.alert("Login Successfully");
                    navigate("/mynavbar");
                } else {
                    window.alert("Invalid credentials");
                }
            })
            .catch(err => {
                if (err.response && err.response.status === 401) {
                    window.alert("Password doesn't match");
                } else if (err.response && err.response.status === 404) {
                    window.alert("No Records found");
                }
            });
    };

    return (
        <div className="auth-page">
            <div className="container">
                <div className="form-container">
                    <div className="form-toggle">
                        <button className={isLogin ? 'active' : ''} onClick={() => setIsLogin(true)}> SignIn </button>
                        <button className={!isLogin ? 'active' : ''} onClick={() => setIsLogin(false)}> SignUp </button>
                    </div>
                    {isLogin ? (
                        <div className="form">
                            <h2>SignIn</h2>
                            <input type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                            <button onClick={handleLogin}>SignIn</button>
                            <p>
                                Don't have an account?{' '}
                                <NavLink to="/signup" onClick={() => setIsLogin(false)}>Signup </NavLink>
                            </p>
                        </div>
                    ) : (
                        <div className="form">
                            <h2>SignUp</h2>
                            <input
                                type="text"
                                placeholder="Username"
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                            <button onClick={handleSignup}>SignUp</button>
                            <p>
                                Already have an account?{' '}
                                <NavLink to="/signin" onClick={() => setIsLogin(true)}>Signin </NavLink>
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AuthForm;
