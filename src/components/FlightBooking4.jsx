import React, { useState } from 'react';
import { db, addDoc, collection } from '../firebaseConfig';  // Adjust the path as needed
import './FlightBooking4.css';  // Use the new CSS file for styling
import { getAuth } from 'firebase/auth';

const FlightBooking4 = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0); // Track current question
    const [image, setImage] = useState("flight1.jpg"); // Initial image for the first question
    const [userAnswers, setUserAnswers] = useState([]); // To store user's selected answers
    const [hearts, setHearts] = useState(5); // Initialize hearts to 5
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false); // To show correct answer if wrong
    const auth = getAuth(); // Initialize Firebase Auth
    const user = auth.currentUser; // Get the current user

    // Define questions, options, and corresponding images for flight booking in French
    const questions = [
        {
            question: "Combien coûte le vol de Paris à Lyon ?",
            options: ["100 euros", "150 euros", "200 euros", "250 euros"],
            correctAnswer: "150 euros",
            image: "flight1.jpg"
        },
        {
            question: "Quand est le prochain vol pour Lyon ?",
            options: ["9h00", "14h00", "18h00", "22h00"],
            correctAnswer: "14h00",
            image: "flight1.jpg"
        },
        {
            question: "Préférez-vous un billet en classe affaires ou en classe économique ?",
            options: ["Classe affaires", "Classe économique", "Première classe", "Je ne veux pas acheter de billet"],
            correctAnswer: "Classe économique",
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
            alert("Félicitations ! Vous avez répondu à toutes les questions.");
        }
    };

    // Save roleplay data to Firebase
    const saveRoleplayData = async () => {
        if (user) {
            try {
                const docRef = await addDoc(collection(db, 'frenchRoleplays'), {
                    userId: user.uid, // Store the user UID
                    scenario: "Réservation de vol", // Scenario name in French
                    userAnswers: userAnswers,
                    completionTime: new Date().toISOString(),
                });
                console.log('Document écrit avec l\'ID: ', docRef.id);
            } catch (e) {
                console.error('Erreur lors de l\'ajout du document: ', e);
            }
        } else {
            console.error('Aucun utilisateur connecté.');
        }
    };

    return (
        <div className="roleplay-container">
            <header className="roleplay-header">
                <h1>Réservation de vol</h1>
            </header>

            <div className="roleplay-content">
                <div className="roleplay-image-container">
                    <img src={`/images/${image}`} alt="flight booking" className="roleplay-image" />
                </div>

                <div className="roleplay-conversation">
                    <p><strong>Question :</strong> {questions[currentQuestion].question}</p>

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
                            <p>La bonne réponse est : {questions[currentQuestion].correctAnswer}</p>
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

export default FlightBooking4;
