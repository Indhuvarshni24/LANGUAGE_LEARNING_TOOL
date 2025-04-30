// src/components/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { auth } from '../firebaseConfig'; 
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import './Signup.css'; 

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleSignup = async (e) => {
        e.preventDefault();
        
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('User registered:', { email, password });
            navigate('/home'); 
        } catch (error) {
            console.error('Error during signup:', error.message);
            alert('Signup failed: ' + error.message); 
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <h1 className="app-title">Learning Tool</h1>
                <div className="signup-form">
                    <h2 className="form-title">Sign Up</h2>
                    <form onSubmit={handleSignup}>
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
                        <button className="submit-button" type="submit">Register</button>
                    </form>

                    <a className="toggle" onClick={() => navigate('/login')}>
                            <br />Already have an account? Login
                    </a>



                </div>
            </div>
            <div className="signup-image">
                <img src="signup.png" alt="Language Learning" />
            </div>
        </div>
    );
};

export default Signup; 