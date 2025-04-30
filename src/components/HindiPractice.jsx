import React, { useState } from 'react';
import './HindiPractice.css';

const HindiPractice = () => {
    // Define a subset of questions with Hindi letters and their corresponding pronunciations
    const questions = [
        { letter: 'अ', correctPronunciation: 'A' },
        { letter: 'आ', correctPronunciation: 'Aa' },
        { letter: 'इ', correctPronunciation: 'I' },
        { letter: 'ई', correctPronunciation: 'Ee' },
        { letter: 'उ', correctPronunciation: 'U' },
        { letter: 'ऊ', correctPronunciation: 'Oo' }
    ];

    // Shuffle options for randomness
    const shuffle = (array) => array.sort(() => Math.random() - 0.5);

    // Available pronunciations (shuffled list with some distractors)
    const allPronunciations = ['A', 'Aa', 'I', 'Ee', 'U', 'Oo', 'E', 'Ai', 'O', 'Au', 'Ka', 'Kha', 'Ga', 'Gha', 'Cha', 'Chha', 'Ja'];

    // State to manage game data
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [lives, setLives] = useState(5);
    const [hearts, setHearts] = useState(5);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

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
                    setGameOver(true); // End the game if lives are 0
                }
                return updatedLives;
            });
            setHearts((prevHearts) => Math.max(prevHearts - 1, 0)); // Subtract heart, down to 0
        }
        goToNextQuestion();
    };

    // Go to the next question or finish the game if all questions are completed
    const goToNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setGameOver(true); // Set game over when all six questions are completed
        }
    };

    // Reset the game
    const resetGame = () => {
        setLives(5);
        setHearts(5);
        setScore(0);
        setCurrentQuestionIndex(0);
        setGameOver(false);
    };

    return (
        <div className="hindipractice">
            <header>
                <h2>Match the Letter to Its Pronunciation (Hindi)</h2>
                <div className="lives">
                    {Array.from({ length: hearts }, (_, i) => (
                        <span key={i} className="heart">❤️</span>
                    ))}
                </div>
            </header>

            {gameOver ? (
                <div className="game-over">
                    <h3>Game Over! {lives > 0 ? "You've completed all questions." : "You're out of lives."}</h3>
                    <p>Final Score: {score}</p>
                    <button onClick={resetGame}>Restart Game</button>
                </div>
            ) : (
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
            )}

            <footer>
                <p>Score: {score}</p>
                <p>Lives: {lives}</p>
            </footer>
        </div>
    );
};

export default HindiPractice;
