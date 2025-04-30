import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MandarinLearning.css'; // Update the CSS file if necessary

const MandarinLearning = () => {
    const [showPopup, setShowPopup] = useState(false); // State to show/hide the popup
    const navigate = useNavigate(); // Initialize the navigate function

    const handleStartLesson = () => {
        setShowPopup(true); // Show the popup when the button is clicked
    };

    const handleLevelSelection = (level) => {
        setShowPopup(false); // Hide the popup after level selection
        if (level === 'beginner') {
            navigate('/mandarin/basic'); // Navigate to the BasicMandarin page
        } else if (level === 'intermediate') {
            navigate('/mandarin/intermediate'); // You can create this page later
        } else if (level === 'advanced') {
            navigate('/scenario'); // Navigate to the ScenarioPage for advanced level
        }
    };

    return (
        <div className="mandarin-container">
            <header className="mandarin-header">
                <h1>Learn Mandarin</h1>
                <p>Explore the world of Mandarin Chinese!</p>
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
                        
                        <button onClick={() => handleLevelSelection('advanced')}>Advanced</button>
                    </div>
                </div>
            )}

            <section className="mandarin-content">
                <h2>Why Learn Mandarin?</h2>
                <p>Mandarin is one of the most widely spoken languages globally, connecting you to a rich culture and history. Whether for business, travel, or personal growth, learning Mandarin can be a valuable asset.</p>

                <h3>Key Features of Our Mandarin Course:</h3>
                <ul>
                    <p>Interactive lessons with engaging exercises.</p>
                    <p>Real-life dialogues to improve conversational skills.</p>
                    <p>Quizzes to test knowledge and track progress.</p>
                </ul>
            </section>

            <footer className="mandarin-footer">
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

export default MandarinLearning;
