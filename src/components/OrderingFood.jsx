import React, { useState } from 'react';
import { db, addDoc, collection } from '../firebaseConfig';
import './OrderingFood.css';
import { getAuth } from 'firebase/auth';

const OrderingFood = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [image, setImage] = useState("food1.jpg");
    const [userAnswers, setUserAnswers] = useState([]);
    const [hearts, setHearts] = useState(5);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
    const auth = getAuth();
    const user = auth.currentUser;

    const questions = [
        {
            question: "你想点什么？",
            options: ["比萨", "意大利面", "汤", "沙拉"],
            correctAnswer: "比萨",
            image: "food1.jpg"
        },
        {
            question: "你想喝点什么？",
            options: ["水", "果汁", "咖啡", "茶"],
            correctAnswer: "水",
            image: "food2.jpg"
        },
        {
            question: "你有甜点吗？",
            options: ["有", "没有", "也许", "我不知道"],
            correctAnswer: "有",
            image: "food3.jpg"
        }
    ];

    const handleAnswerSelection = (selectedAnswer) => {
        const correctAnswer = questions[currentQuestion].correctAnswer;
        setUserAnswers((prevAnswers) => [...prevAnswers, selectedAnswer]);

        if (selectedAnswer === correctAnswer) {
            setHearts((prevHearts) => Math.min(prevHearts + 1, 5));
            setShowCorrectAnswer(false);
        } else {
            setHearts((prevHearts) => Math.max(prevHearts - 1, 0));
            setShowCorrectAnswer(true);
        }

        if (currentQuestion < questions.length - 1) {
            setTimeout(() => {
                setCurrentQuestion(currentQuestion + 1);
                setImage(questions[currentQuestion + 1].image);
                setShowCorrectAnswer(false);
            }, 1000);
        } else {
            saveRoleplayData();
            alert("恭喜！你已经完成所有问题。");
        }
    };

    const saveRoleplayData = async () => {
        if (user) {
            try {
                const docRef = await addDoc(collection(db, 'orderingFood'), {
                    userId: user.uid,
                    scenario: "点餐",
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
                <h1>点餐练习</h1>
            </header>
    
            <div className="roleplay-content">
                <div className="roleplay-image-container">
                    <img src={`/images/${image}`} alt="food" className="roleplay-image" />
                </div>
    
                {/* Hearts container is positioned below the image */}
                <div className="hearts-container">
                    {Array.from({ length: hearts }).map((_, index) => (
                        <span key={index} className="heart">❤️</span>
                    ))}
                </div>
    
                <div className="roleplay-conversation">
                    <p><strong>问题:</strong> {questions[currentQuestion].question}</p>
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
    
                    {showCorrectAnswer && (
                        <div className="correct-answer">
                            <p>正确答案是: {questions[currentQuestion].correctAnswer}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
    
};

export default OrderingFood;
