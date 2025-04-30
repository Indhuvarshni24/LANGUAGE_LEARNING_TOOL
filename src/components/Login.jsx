// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { auth } from '../firebaseConfig'; 
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import './Login.css'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('User logged in:', { email, password });
            navigate('/home'); 
        } catch (error) {
            console.error('Error during login:', error.message);
            alert('Login failed: ' + error.message); 
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h1 className="app-title">Learning Tool</h1>
                <div className="login-form">
                    <h2 className="form-title">Login</h2>
                    <form onSubmit={handleLogin}>
                        <input 
                            type="email" 
                            className="input-field"
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                        <input 
                            type="password" 
                            className="input-field"
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                        <button className="submit-button" type="submit">Login</button>
                    </form>
                    <a className="toggle" onClick={() => navigate('/')}>
                        <br />Don't have an account? Sign up
                    </a>

                </div>
            </div>
            <div className="login-image">
                <img src="im.png" alt="Language Learning" />
            </div>
        </div>
    );
};

export default Login;
