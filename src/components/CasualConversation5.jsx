import React, { useState } from 'react';
import { db, addDoc, collection } from '../firebaseConfig';  // Adjust the path as needed
import './CasualConversation5.css'; // Update the CSS file for styling
import { getAuth } from 'firebase/auth';

const CasualConversation5 = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0); // Track current question
    const [image, setImage] = useState("casual1.jpg"); // Initial image for the first question
    const [userAnswers, setUserAnswers] = useState([]); // To store user's selected answers
    const [hearts, setHearts] = useState(5); // Initialize hearts to 5
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false); // To show correct answer if wrong
    const [answeredQuestions, setAnsweredQuestions] = useState([]); // Track answered questions
    const auth = getAuth(); // Initialize Firebase Auth
    const user = auth.currentUser; // Get the current user

    // Define questions, options, and corresponding images for casual conversation in Japanese
    const questions = [
        {
            question: "元気ですか？",
            options: ["とても元気です！", "あまり元気ではありません。", "まあまあです。", "すごく元気です！"],
            correctAnswer: "とても元気です！",
            image: "casual1.jpg"
        },
        {
            question: "週末は何をしますか？",
            options: ["映画を見に行きます。", "仕事をします。", "家でリラックスします。", "ハイキングをします。"],
            correctAnswer: "映画を見に行きます。",
            image: "casual2.jpg"
        },
        {
            question: "どこで働いていましたか？",
            options: ["オフィスで働いていました。", "レストランで働いていました。", "お店で働いていました。", "先生として働いていました。"],
            correctAnswer: "オフィスで働いていました。",
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
            alert("おめでとうございます！すべての質問に答えました。");
        }
    };

    // Save roleplay data to Firebase
    const saveRoleplayData = async () => {
        if (user) {
            try {
                const docRef = await addDoc(collection(db, 'japaneseRoleplays'), {
                    userId: user.uid, // Store the user UID
                    scenario: "カジュアルな会話", // Scenario name in Japanese
                    userAnswers: userAnswers,
                    completionTime: new Date().toISOString(),
                });
                console.log('ドキュメントが作成されました: ', docRef.id);
            } catch (e) {
                console.error('ドキュメントの追加中にエラーが発生しました: ', e);
            }
        } else {
            console.error('ユーザーがログインしていません。');
        }
    };

    return (
        <div className="casual-conversation-container">
            <header className="casual-conversation-header">
                <h1>カジュアルな会話の練習</h1>
            </header>

            <div className="casual-conversation-content">
                <div className="casual-conversation-image-container">
                    <img src={`/images/${image}`} alt="conversation" className="casual-conversation-image" />
                </div>

                <div className="casual-conversation">
                    <p><strong>質問：</strong> {questions[currentQuestion].question}</p>

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
                            <p>正しい答えは: {questions[currentQuestion].correctAnswer}</p>
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

export default CasualConversation5;
