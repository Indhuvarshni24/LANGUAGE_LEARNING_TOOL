import React, { useState } from 'react';
import { db, addDoc, collection } from '../firebaseConfig';  // Adjust the path as needed
import './CasualConversation4.css'; // Create a separate CSS file for styling
import { getAuth } from 'firebase/auth';

const CasualConversation4 = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0); // Track current question
    const [image, setImage] = useState("casual1.jpg"); // Initial image for the first question
    const [userAnswers, setUserAnswers] = useState([]); // To store user's selected answers
    const [hearts, setHearts] = useState(5); // Initialize hearts to 5
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false); // To show correct answer if wrong
    const [answeredQuestions, setAnsweredQuestions] = useState([]); // Track answered questions
    const auth = getAuth(); // Initialize Firebase Auth
    const user = auth.currentUser; // Get the current user

    // Define questions, options, and corresponding images for casual conversation in French
    const questions = [
        {
            question: "Comment ça va ?",
            options: ["Très bien, merci !", "Pas très bien.", "Comme ci, comme ça.", "Super !"],
            correctAnswer: "Très bien, merci !",
            image: "casual1.jpg"
        },
        {
            question: "Que fais-tu le week-end ?",
            options: ["Je vais au cinéma.", "Je travaille.", "Je me détends à la maison.", "Je fais de la randonnée."],
            correctAnswer: "Je vais au cinéma.",
            image: "casual2.jpg"
        },
        {
            question: "Où as-tu travaillé ?",
            options: ["J'ai travaillé dans un bureau.", "J'ai travaillé dans un restaurant.", "J'ai travaillé dans un magasin.", "J'ai travaillé comme enseignant."],
            correctAnswer: "J'ai travaillé dans un bureau.",
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
            alert("Félicitations ! Vous avez répondu à toutes les questions.");
        }
    };

    // Save roleplay data to Firebase
    const saveRoleplayData = async () => {
        if (user) {
            try {
                const docRef = await addDoc(collection(db, 'frenchRoleplays'), {
                    userId: user.uid, // Store the user UID
                    scenario: "Conversation Casual", // Scenario name in French
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
        <div className="casual-conversation-container">
            <header className="casual-conversation-header">
                <h1>Conversation Casual</h1>
            </header>

            <div className="casual-conversation-content">
                <div className="casual-conversation-image-container">
                    <img src={`/images/${image}`} alt="conversation" className="casual-conversation-image" />
                </div>

                <div className="casual-conversation">
                    <p><strong>Question :</strong> {questions[currentQuestion].question}</p>

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

export default CasualConversation4;
