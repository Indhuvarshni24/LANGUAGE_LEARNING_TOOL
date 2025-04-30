import React, { useState } from 'react';
import './PracticePage2.css';

const PracticePage2 = () => {
    // Define questions with Spanish letters and their corresponding pronunciations
    const questions = [
        { letter: 'A', correctPronunciation: 'Ah' },
        { letter: 'B', correctPronunciation: 'Bay' },
        { letter: 'C', correctPronunciation: 'Say' },
        { letter: 'D', correctPronunciation: 'Day' },
        { letter: 'E', correctPronunciation: 'Eh' },
        { letter: 'W', correctPronunciation: 'Dob-leh-vay' },
        { letter: 'X', correctPronunciation: 'Eh-kees' },
        { letter: 'Y', correctPronunciation: 'Ee-gri-ay-ga' },
        { letter: 'Z', correctPronunciation: 'Say-tah' },
    ];

    // Shuffle options for randomness
    const shuffle = (array) => array.sort(() => Math.random() - 0.5);

    // Available pronunciations (shuffled list with some distractors)
    const allPronunciations = ['Ah', 'Bay', 'Say', 'Day', 'Eh', 'Dob-leh-vay', 'Eh-kees', 'Ee-gri-ay-ga', 'Say-tah', 'Effay', 'Hay', 'Ah-chay', 'Ee'];

    // State to manage game data
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [lives, setLives] = useState(5);
    const [hearts, setHearts] = useState(5); // Track hearts
    const [score, setScore] = useState(0);

    // Get current question and shuffle options
    const currentQuestion = questions[currentQuestionIndex];
    const options = shuffle([currentQuestion.correctPronunciation, ...allPronunciations.filter(item => item !== currentQuestion.correctPronunciation)]).slice(0, 4);

    // Handle answer selection
    const handleAnswer = (pronunciation) => {
        if (pronunciation === currentQuestion.correctPronunciation) {
            setScore(score + 1);
            setHearts((prevHearts) => Math.min(prevHearts + 1, 5)); // Add heart, up to 5
        } else {
            setLives((prevLives) => {
                const updatedLives = prevLives - 1;
                if (updatedLives <= 0) {
                    resetGame(); // Reset game if lives are 0
                }
                return updatedLives;
            });
            setHearts((prevHearts) => Math.max(prevHearts - 1, 0)); // Subtract heart, down to 0
        }
        goToNextQuestion();
    };

    // Go to the next question
    const goToNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            alert('Game Over! You have completed the questions.');
            resetGame(); // Reset the game after completing all questions
        }
    };

    // Reset the game
    const resetGame = () => {
        setLives(5);
        setHearts(5);
        setScore(0);
        setCurrentQuestionIndex(0);
    };

    return (
        <div className="practice-page2">
            <header>
                <h2>Match the Letter to Its Pronunciation (Spanish)</h2>
                <div className="lives">
                    {Array.from({ length: hearts }, (_, i) => (
                        <span key={i} className="heart">❤️</span>
                    ))}
                </div>
            </header>

            <div className="question">
                <h3>What is the pronunciation of "{currentQuestion.letter}"?</h3>
                <div className="options">
                    {options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(option)}
                            className="option-button"
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            <footer>
                <p>Score: {score}</p>
                <p>Lives: {lives}</p>
                <button onClick={resetGame}>Restart Game</button>
            </footer>
        </div>
    );
};

export default PracticePage2;
