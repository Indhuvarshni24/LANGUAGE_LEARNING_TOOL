import React, { useState } from 'react';
import { db, addDoc, collection } from '../firebaseConfig';  // Adjust the path as needed
import './GermanRolePlay.css';
import { getAuth } from 'firebase/auth';

const GermanRolePlay = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0); // Track current question
    const [image, setImage] = useState("food1.jpg"); // Initial image for the first question
    const [userAnswers, setUserAnswers] = useState([]); // To store user's selected answers
    const [hearts, setHearts] = useState(5); // Initialize hearts to 5
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false); // To show correct answer if wrong
    const [answeredQuestions, setAnsweredQuestions] = useState([]); // Track answered questions
    const auth = getAuth(); // Initialize Firebase Auth
    const user = auth.currentUser; // Get the current user

    // Define questions, options, and corresponding images
    const questions = [
        {
            question: "Was möchten Sie bestellen?",
            options: ["Pizza", "Pasta", "Suppe", "Salat"],
            correctAnswer: "Pizza",
            image: "food1.jpg"
        },
        {
            question: "Möchten Sie etwas zu trinken?",
            options: ["Wasser", "Saft", "Kaffee", "Tee"],
            correctAnswer: "Wasser",
            image: "food2.jpg"
        },
        {
            question: "Haben Sie einen Nachtisch?",
            options: ["Ja", "Nein", "Vielleicht", "Ich weiß nicht"],
            correctAnswer: "Ja",
            image: "food3.jpg"
        }
    ];

    // Handle answer selection
    const handleAnswerSelection = (selectedAnswer) => {
        const correctAnswer = questions[currentQuestion].correctAnswer;

        // Store the selected answer
        setUserAnswers((prevAnswers) => [
            ...prevAnswers,
            selectedAnswer
        ]);

        if (selectedAnswer === correctAnswer) {
            // Correct answer, increment hearts from the last
            setHearts((prevHearts) => Math.min(prevHearts + 1, 5)); // Max hearts is 5
            setShowCorrectAnswer(false);
        } else {
            // Incorrect answer, decrement hearts from the last
            setHearts((prevHearts) => Math.max(prevHearts - 1, 0)); // Min hearts is 0
            setShowCorrectAnswer(true);
        }

        // Add current question to answered questions
        setAnsweredQuestions((prev) => [...prev, currentQuestion]);

        // Move to next question after a delay to show the answer
        if (currentQuestion < questions.length - 1) {
            setTimeout(() => {
                setCurrentQuestion(currentQuestion + 1);
                setImage(questions[currentQuestion + 1].image); // Change the image
                setShowCorrectAnswer(false); // Reset showing the correct answer for next question
            }, 1000); // Wait 1 second before moving to the next question
        } else {
            // All questions answered, save data to Firebase
            saveRoleplayData();
            alert("Congratulations! You have answered all the questions.");
        }
    };

    // Save roleplay data to Firebase
    const saveRoleplayData = async () => {
        if (user) {
            try {
                const docRef = await addDoc(collection(db, 'germanRoleplays'), {
                    userId: user.uid, // Store the user UID
                    scenario: "Bestellen Sie Ihr Essen", // Scenario name
                    userAnswers: userAnswers,
                    completionTime: new Date().toISOString(),
                });
                console.log('Document written with ID: ', docRef.id);
            } catch (e) {
                console.error('Error adding document: ', e);
            }
        } else {
            console.error('No user is logged in.');
        }
    };

    return (
        <div className="roleplay-container">
            <header className="roleplay-header">
                <h1>Bestellen Sie Ihr Essen!</h1>
            </header>

            <div className="roleplay-content">
                <div className="roleplay-image-container">
                    <img src={`/images/${image}`} alt="food" className="roleplay-image" />
                </div>

                <div className="roleplay-conversation">
                    <p><strong>Frage:</strong> {questions[currentQuestion].question}</p>

                    <div className="roleplay-options">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerSelection(option)}
                                className="roleplay-option-button"
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                    {/* Display correct answer if user answers incorrectly */}
                    {showCorrectAnswer && (
                        <div className="correct-answer">
                            <p>The correct answer is: {questions[currentQuestion].correctAnswer}</p>
                        </div>
                    )}
                </div>

                {/* Display hearts */}
                
                <div className="hearts-container">
                    {Array.from({ length: hearts }).reverse().map((_, index) => (
                        <span key={index} className="heart">❤️</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GermanRolePlay;
