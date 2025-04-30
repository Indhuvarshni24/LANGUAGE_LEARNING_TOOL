import React, { useState } from 'react';
import { db, addDoc, collection } from '../firebaseConfig';  // Adjust the path as needed
import './FlightBooking3.css';  // Use the new CSS file for styling
import { getAuth } from 'firebase/auth';

const FlightBooking3 = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0); // Track current question
    const [image, setImage] = useState("flight1.jpg"); // Initial image for the first question
    const [userAnswers, setUserAnswers] = useState([]); // To store user's selected answers
    const [hearts, setHearts] = useState(5); // Initialize hearts to 5
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false); // To show correct answer if wrong
    const auth = getAuth(); // Initialize Firebase Auth
    const user = auth.currentUser; // Get the current user

    // Define questions, options, and corresponding images for flight booking in Spanish
    const questions = [
        {
            question: "¿Cuánto cuesta el vuelo de Delhi a Mumbai?",
            options: ["10,000 rupias", "15,000 rupias", "20,000 rupias", "25,000 rupias"],
            correctAnswer: "15,000 rupias",
            image: "flight1.jpg"
        },
        {
            question: "¿Cuándo es el próximo vuelo a Mumbai?",
            options: ["9:00 AM", "2:00 PM", "6:00 PM", "10:00 PM"],
            correctAnswer: "2:00 PM",
            image: "flight1.jpg"
        },
        {
            question: "¿Preferirías un boleto de clase ejecutiva o clase económica?",
            options: ["Clase ejecutiva", "Clase económica", "Primera clase", "No quiero comprar boletos"],
            correctAnswer: "Clase económica",
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
            alert("¡Felicidades! Has respondido todas las preguntas.");
        }
    };

    // Save roleplay data to Firebase
    const saveRoleplayData = async () => {
        if (user) {
            try {
                const docRef = await addDoc(collection(db, 'spanishRoleplays'), {
                    userId: user.uid, // Store the user UID
                    scenario: "Reserva de vuelo", // Scenario name in Spanish
                    userAnswers: userAnswers,
                    completionTime: new Date().toISOString(),
                });
                console.log('Documento escrito con ID: ', docRef.id);
            } catch (e) {
                console.error('Error al agregar el documento: ', e);
            }
        } else {
            console.error('No hay usuario registrado.');
        }
    };

    return (
        <div className="roleplay-container">
            <header className="roleplay-header">
                <h1>Reserva de vuelo</h1>
            </header>

            <div className="roleplay-content">
                <div className="roleplay-image-container">
                    <img src={`/images/${image}`} alt="flight booking" className="roleplay-image" />
                </div>

                <div className="roleplay-conversation">
                    <p><strong>Pregunta:</strong> {questions[currentQuestion].question}</p>

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
                            <p>La respuesta correcta es: {questions[currentQuestion].correctAnswer}</p>
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

export default FlightBooking3;
