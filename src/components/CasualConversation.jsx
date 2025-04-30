import React, { useState } from 'react';
import { db, addDoc, collection } from '../firebaseConfig';  // Adjust the path as needed
import './CasualConversation.css'; // Create a separate CSS file for styling
import { getAuth } from 'firebase/auth';

const CasualConversation = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0); // Track current question
    const [image, setImage] = useState("casual1.jpg"); // Initial image for the first question
    const [userAnswers, setUserAnswers] = useState([]); // To store user's selected answers
    const [hearts, setHearts] = useState(5); // Initialize hearts to 5
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false); // To show correct answer if wrong
    const [answeredQuestions, setAnsweredQuestions] = useState([]); // Track answered questions
    const auth = getAuth(); // Initialize Firebase Auth
    const user = auth.currentUser; // Get the current user

    // Define questions, options, and corresponding images for casual conversation in Mandarin
    const questions = [
        {
            question: "你好吗？",
            options: ["很好，谢谢！", "不太好。", "一般般。", "太棒了！"],
            correctAnswer: "很好，谢谢！",
            image: "casual1.jpg"
        },
        {
            question: "周末你做什么？",
            options: ["我去看电影。", "我工作。", "我在家放松。", "我去远足。"],
            correctAnswer: "我去看电影。",
            image: "casual2.jpg"
        },
        {
            question: "你在哪里工作过？",
            options: ["我在办公室工作过。", "我在餐厅工作过。", "我在商店工作过。", "我做过老师。"],
            correctAnswer: "我在办公室工作过。",
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
            alert("恭喜！你已完成所有问题。");
        }
    };

    // Save roleplay data to Firebase
    const saveRoleplayData = async () => {
        if (user) {
            try {
                const docRef = await addDoc(collection(db, 'mandarinRoleplays'), {
                    userId: user.uid, // Store the user UID
                    scenario: "Casual Conversation", // Scenario name
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
                <h1>日常对话</h1>
            </header>

            <div className="casual-conversation-content">
                <div className="casual-conversation-image-container">
                    <img src={`/images/${image}`} alt="conversation" className="casual-conversation-image" />
                </div>

                <div className="casual-conversation">
                    <p><strong>问题:</strong> {questions[currentQuestion].question}</p>

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
                            <p>正确答案是: {questions[currentQuestion].correctAnswer}</p>
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

export default CasualConversation;
