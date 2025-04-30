import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Japanese.css'; // Make sure to create this CSS file for the Japanese learning page

const Japanese = () => {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const handleStartLesson = () => {
        setShowPopup(true);
    };

    const handleLevelSelection = (level) => {
        setShowPopup(false);
        if (level === 'beginner') {
            navigate('/japanese/basic');
        } else if (level === 'intermediate') {
            navigate('/japanese/intermediate'); // Navigate to IntermediateJapanese page
        } else if (level === 'advanced') {
            navigate('/japanese/advanced');
        }
    };

    return (
        <div className="japanese-container">
            <header className="japanese-header">
                <h1>Learn Japanese</h1>
                <p>Embark on a journey into the world of Japanese language and culture!</p>
                <button className="cta-button" onClick={handleStartLesson}>
                    Start Your First Lesson
                </button>
            </header>

            {showPopup && (
                <div className="level-popup">
                    <div className="popup-content">
                        <h2>Select Your Level</h2>
                        <button onClick={() => handleLevelSelection('beginner')}>Beginner</button>
                        <button onClick={() => handleLevelSelection('intermediate')}>Intermediate</button>
                        <button onClick={() => handleLevelSelection('advanced')}>Advanced</button>
                    </div>
                </div>
            )}

            <section className="japanese-content">
                <h2>Why Learn Japanese?</h2>
                <p>Japanese is a language full of rich history and culture. Whether you're interested in traditional arts, anime, or business, learning Japanese opens up new worlds of opportunity and connection.</p>
            </section>

            <footer className="japanese-footer">
                <p>&copy; 2024 LinguaLearn</p>
                <div className="footer-links">
                    <a href="/">Home</a>
                    <a href="#features">Features</a>
                    <a href="#about">About Us</a>
                    <a href="#contact">Contact</a>
                </div>
            </footer>
        </div>
    );
};

export default Japanese;
