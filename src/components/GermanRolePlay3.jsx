import React, { useState } from 'react';
import { db, addDoc, collection } from '../firebaseConfig';  // Adjust the path as needed
import './GermanRolePlay.css';
import { getAuth } from 'firebase/auth';

const GermanFlightBooking = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0); // Track current question
    const [image, setImage] = useState("flight1.jpg"); // Initial image for the first question
    const [userAnswers, setUserAnswers] = useState([]); // To store user's selected answers
    const [hearts, setHearts] = useState(5); // Initialize hearts to 5
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false); // To show correct answer if wrong
    const auth = getAuth(); // Initialize Firebase Auth
    const user = auth.currentUser; // Get the current user

    // Define questions, options, and corresponding images for flight booking
    const questions = [
        {
            question: "Wie viel kostet ein Flugticket nach Berlin?",
            options: ["100 Euro", "200 Euro", "150 Euro", "250 Euro"],
            correctAnswer: "200 Euro",
            image: "flight1.jpg"
        },
        {
            question: "Wann ist der nächste Flug nach München?",
            options: ["Um 10:00 Uhr", "Um 14:00 Uhr", "Um 18:00 Uhr", "Um 20:00 Uhr"],
            correctAnswer: "Um 14:00 Uhr",
            image: "flight1.jpg"
        },
        {
            question: "Möchten Sie ein Ticket in der ersten Klasse oder in der Economy-Klasse?",
            options: ["Erste Klasse", "Economy-Klasse", "Business-Klasse", "Ich möchte kein Ticket buchen"],
            correctAnswer: "Economy-Klasse",
            image: "flight1.jpg"
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

        // Move to next question after a delay to show the correct answer
        if (currentQuestion < questions.length - 1) {
            setTimeout(() => {
                setCurrentQuestion(currentQuestion + 1);
                setImage(questions[currentQuestion + 1].image); // Change the image
                setShowCorrectAnswer(false); // Reset showing the correct answer for next question
            }, 2000); // Wait 2 seconds before moving to the next question
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
                    scenario: "Flight Booking", // Scenario name
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
                <h1>Flight Booking!</h1>
            </header>

            <div className="roleplay-content">
                <div className="roleplay-image-container">
                    <img src={`/images/${image}`} alt="flight booking" className="roleplay-image" />
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

export default GermanFlightBooking;
