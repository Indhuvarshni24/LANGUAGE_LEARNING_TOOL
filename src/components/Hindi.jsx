import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hindi.css'; // Make sure to create this CSS file for the Hindi learning page

const Hindi = () => {
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const handleStartLesson = () => {
        setShowPopup(true);
    };

    const handleLevelSelection = (level) => {
        setShowPopup(false);
        if (level === 'beginner') {
            navigate('/hindi/basic');
        } else if (level === 'intermediate') {
            navigate('/hindi/intermediate'); // Navigate to IntermediateHindi page
        } else if (level === 'advanced') {
            navigate('/hindi/advanced'); // Adjust this if you have a specific page for advanced Hindi scenarios
        }
    };

    return (
        <div className="hindi-container">
            <header className="hindi-header">
                <h1>Learn Hindi</h1>
                <p>Embark on a journey into the world of Hindi language and culture!</p>
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

            <section className="hindi-content">
                <h2>Why Learn Hindi?</h2>
                <p>Hindi is one of the most spoken languages in the world, with a rich history and vibrant cultural heritage. Learning Hindi can open doors to literature, cinema, and deep cultural connections.</p>
            </section>

            <footer className="hindi-footer">
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

export default Hindi;
