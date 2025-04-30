import React, { useState } from 'react';
import './PracticePage.css';

const PracticePage = () => {
    const questions = [
        { letter: 'A', correctPronunciation: 'Ah' },
        { letter: 'B', correctPronunciation: 'Bay' },
        { letter: 'C', correctPronunciation: 'Tsay' },
        { letter: 'D', correctPronunciation: 'Day' },
        { letter: 'E', correctPronunciation: 'Eh' },
    ];

    const allPronunciations = ['Ah', 'Bay', 'Tsay', 'Day', 'Eh'];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [lives, setLives] = useState(5);
    const [hearts, setHearts] = useState(5);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const currentQuestion = questions[currentQuestionIndex];

    // Generate options with the correct answer guaranteed to be included
    const generateOptions = () => {
        const options = [currentQuestion.correctPronunciation];
        
        // Filter out the correct answer from allPronunciations and shuffle the distractors
        const distractors = allPronunciations
            .filter((item) => item !== currentQuestion.correctPronunciation)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3); // Pick three distractors

        // Combine the correct answer with distractors and shuffle
        return shuffle([...options, ...distractors]);
    };

    const shuffle = (array) => array.sort(() => Math.random() - 0.5);
    const options = generateOptions(); // Generate new options for the current question

    const handleAnswer = (pronunciation) => {
        if (pronunciation === currentQuestion.correctPronunciation) {
            setScore(score + 1);
            setHearts((prevHearts) => Math.min(prevHearts + 1, 5));
        } else {
            setLives((prevLives) => {
                const updatedLives = prevLives - 1;
                if (updatedLives <= 0) {
                    setGameOver(true);
                }
                return updatedLives;
            });
            setHearts((prevHearts) => Math.max(prevHearts - 1, 0));
        }
        goToNextQuestion();
    };

    const goToNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setGameOver(true);
        }
    };

    const resetGame = () => {
        setLives(5);
        setHearts(5);
        setScore(0);
        setCurrentQuestionIndex(0);
        setGameOver(false);
    };

    return (
        <div className="practice-page">
            <header>
                <h2>Match the Letter to Its Pronunciation</h2>
                <div className="lives">
                    {Array.from({ length: hearts }, (_, i) => (
                        <span key={i} className="heart">❤️</span>
                    ))}
                </div>
            </header>

            {gameOver ? (
                <div className="game-over">
                    <h3>Game Over!</h3>
                    <p>Your Final Score: {score}</p>
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
                {!gameOver && <button onClick={resetGame}>Restart Game</button>}
            </footer>
        </div>
    );
};

export default PracticePage;
