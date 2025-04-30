import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GermanLearning.css';

const German = () => {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const handleStartLesson = () => {
        setShowPopup(true);
    };

    const handleLevelSelection = (level) => {
        setShowPopup(false);
        if (level === 'beginner') {
            navigate('/german/basic');
        } else if (level === 'intermediate') {
            navigate('/german/intermediate'); // Navigate to IntermediateGerman page
        } else if (level === 'advanced') {
            navigate('/scenario');
        }
    };

    return (
        <div className="german-container">
            <header className="german-header">
                <h1>Learn German</h1>
                <p>Unlock the beauty of the German language!</p>
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
            <section className="german-content">
                <h2>Why Learn German?</h2>
                <p>German is not only the most widely spoken language in Europe but also opens doors to rich cultural heritage and numerous opportunities. Whether you're traveling, working, or studying, mastering German will enhance your experiences.</p>

                
            </section>

            <footer className="german-footer">
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

export default German;
