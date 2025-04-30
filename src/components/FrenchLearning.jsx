import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FrenchLearning.css'; // Update the CSS file if necessary

const FrenchLearning = () => {
    const [showPopup, setShowPopup] = useState(false); // State to show/hide the popup
    const navigate = useNavigate(); // Initialize the navigate function

    const handleStartLesson = () => {
        setShowPopup(true); // Show the popup when the button is clicked
    };

    const handleLevelSelection = (level) => {
        setShowPopup(false); // Hide the popup after level selection
        if (level === 'beginner') {
            navigate('/french/basic'); // Navigate to the BasicFrench page
        } else if (level === 'intermediate') {
            navigate('/french/intermediate'); // You can create this page later
        } else if (level === 'advanced') {
            navigate('/scenario'); // Navigate to the ScenarioPage for advanced level
        }
    };

    return (
        <div className="french-container">
            <header className="french-header">
                <h1>Learn French</h1>
                <p>Unlock the beauty of the French language!</p>
                <button className="cta-button" onClick={handleStartLesson}>
                    Start Your First Lesson
                </button>
            </header>

            {/* Popup for selecting level */}
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

            <section className="french-content">
                <h2>Why Learn French?</h2>
                <p>French is one of the most widely spoken languages worldwide, opening doors to numerous cultures and opportunities. Whether you're traveling, working, or studying, mastering French will enrich your experiences.</p>

                
            </section>

            <footer className="french-footer">
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

export default FrenchLearning;
