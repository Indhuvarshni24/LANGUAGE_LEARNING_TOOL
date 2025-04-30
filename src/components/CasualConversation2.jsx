import React, { useState } from 'react';
import { db, addDoc, collection } from '../firebaseConfig';  // Adjust the path as needed
import './CasualConversation2.css'; // Create a separate CSS file for styling
import { getAuth } from 'firebase/auth';

const CasualConversation2 = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0); // Track current question
    const [image, setImage] = useState("casual1.jpg"); // Initial image for the first question
    const [userAnswers, setUserAnswers] = useState([]); // To store user's selected answers
    const [hearts, setHearts] = useState(5); // Initialize hearts to 5
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false); // To show correct answer if wrong
    const [answeredQuestions, setAnsweredQuestions] = useState([]); // Track answered questions
    const auth = getAuth(); // Initialize Firebase Auth
    const user = auth.currentUser; // Get the current user

    // Define questions, options, and corresponding images for casual conversation in Hindi
    const questions = [
        {
            question: "आप कैसे हैं?",
            options: ["बहुत अच्छा, धन्यवाद!", "ठीक नहीं।", "सामान्य।", "बहुत अच्छा!"],
            correctAnswer: "बहुत अच्छा, धन्यवाद!",
            image: "casual1.jpg"
        },
        {
            question: "आप सप्ताहांत में क्या करते हैं?",
            options: ["मैं फिल्म देखने जाता हूँ।", "मैं काम करता हूँ।", "मैं घर पर आराम करता हूँ।", "मैं ट्रैकिंग करता हूँ।"],
            correctAnswer: "मैं फिल्म देखने जाता हूँ।",
            image: "casual2.jpg"
        },
        {
            question: "आपने कहाँ काम किया है?",
            options: ["मैंने ऑफिस में काम किया है।", "मैंने रेस्टोरेंट में काम किया है।", "मैंने दुकान में काम किया है।", "मैंने शिक्षक के रूप में काम किया है।"],
            correctAnswer: "मैंने ऑफिस में काम किया है।",
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
            alert("बधाई हो! आपने सभी प्रश्नों का उत्तर दिया।");
        }
    };

    // Save roleplay data to Firebase
    const saveRoleplayData = async () => {
        if (user) {
            try {
                const docRef = await addDoc(collection(db, 'hindiRoleplays'), {
                    userId: user.uid, // Store the user UID
                    scenario: "Casual Conversation", // Scenario name in Hindi
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
        <div className="casual-conversation-container">
            <header className="casual-conversation-header">
                <h1>सामान्य बातचीत</h1>
            </header>

            <div className="casual-conversation-content">
                <div className="casual-conversation-image-container">
                    <img src={`/images/${image}`} alt="conversation" className="casual-conversation-image" />
                </div>

                <div className="casual-conversation">
                    <p><strong>प्रश्न:</strong> {questions[currentQuestion].question}</p>

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
                            <p>सही उत्तर है: {questions[currentQuestion].correctAnswer}</p>
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

export default CasualConversation2;
