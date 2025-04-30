import React, { useState } from 'react';
import { db, addDoc, collection } from '../firebaseConfig';  // Adjust the path as needed
import './CasualConversation3.css'; // Create a separate CSS file for styling
import { getAuth } from 'firebase/auth';

const CasualConversation3 = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0); // Track current question
    const [image, setImage] = useState("casual1.jpg"); // Initial image for the first question
    const [userAnswers, setUserAnswers] = useState([]); // To store user's selected answers
    const [hearts, setHearts] = useState(5); // Initialize hearts to 5
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false); // To show correct answer if wrong
    const [answeredQuestions, setAnsweredQuestions] = useState([]); // Track answered questions
    const auth = getAuth(); // Initialize Firebase Auth
    const user = auth.currentUser; // Get the current user

    // Define questions, options, and corresponding images for casual conversation in Spanish
    const questions = [
        {
            question: "¿Cómo estás?",
            options: ["Muy bien, ¡gracias!", "No muy bien.", "Más o menos.", "¡Excelente!"],
            correctAnswer: "Muy bien, ¡gracias!",
            image: "casual1.jpg"
        },
        {
            question: "¿Qué haces los fines de semana?",
            options: ["Voy al cine.", "Trabajo.", "Me relajo en casa.", "Hago senderismo."],
            correctAnswer: "Voy al cine.",
            image: "casual2.jpg"
        },
        {
            question: "¿Dónde has trabajado?",
            options: ["He trabajado en una oficina.", "He trabajado en un restaurante.", "He trabajado en una tienda.", "He trabajado como maestro."],
            correctAnswer: "He trabajado en una oficina.",
            image: "casual3.jpg"
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
                    scenario: "Conversación Casual", // Scenario name in Spanish
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
        <div className="casual-conversation-container">
            <header className="casual-conversation-header">
                <h1>Conversación Casual</h1>
            </header>

            <div className="casual-conversation-content">
                <div className="casual-conversation-image-container">
                    <img src={`/images/${image}`} alt="conversation" className="casual-conversation-image" />
                </div>

                <div className="casual-conversation">
                    <p><strong>Pregunta:</strong> {questions[currentQuestion].question}</p>

                    <div className="casual-conversation-options">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerSelection(option)}
                                className="casual-conversation-option-button"
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

export default CasualConversation3;
