// src/components/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <header className="header">
                <h1>Welcome to Language Learning App</h1>
                <h3>Master a language, step by step</h3>
                
            </header>

            <section className="popular-languages">
                <h2>Popular Languages</h2>
                <div className="language-list">
                    <div className="language-item">
                        <Link to="/german">German</Link>
                    </div>
                    <div className="language-item">
                        <Link to="/spanish">Spanish</Link>
                    </div>
                    <div className="language-item">
                        <Link to="/french">French</Link>
                    </div>
                    <div className="language-item">
                        <Link to="/japanese">Japanese</Link>
                    </div>
                    <div className="language-item">
                        <Link to="/mandarin">Mandarin</Link>
                    </div>
                    <div className="language-item">
                        <Link to="/hindi">Hindi</Link>
                    </div>
                </div>
            </section>
            <div className="chatbot-button-container">
                <Link to="/chatbot" className="chatbot-button">
                    Open Chatbot
                </Link>
            </div>

            <section className="testimonials">
                <h2>What Our Learners Say</h2>
                <div className="testimonial-list">
                    <div className="testimonial-item">
                        <p>"This app made learning so much easier and enjoyable!"</p>
                        <h4>- Alex P.</h4>
                    </div>
                    <div className="testimonial-item">
                        <p>"I improved my language skills in just a few weeks!"</p>
                        <h4>- Taylor S.</h4>
                    </div>
                    <div className="testimonial-item">
                        <p>"Great interactive lessons that keep me engaged."</p>
                        <h4>- Jordan K.</h4>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <p>&copy; 2024 LinguaLearn</p>
                <div className="footer-links">
                    <a href="#features">Features</a>
                    <a href="#about">About Us</a>
                    <a href="#contact">Contact</a>
                </div>
            </footer>
        </div>
    );
};

export default Home;
