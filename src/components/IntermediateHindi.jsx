import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './IntermediateHindi.css';

const IntermediateHindi = () => {
    const [currentTopicIndex, setCurrentTopicIndex] = useState(0); // Track the index of the current topic
    const navigate = useNavigate(); // Initialize navigate function

    const grammarTopics = [
        {
            title: 'विभक्ति (Nominative, Accusative, Dative, Genitive)',
            content: 'हिंदी में विभक्ति संज्ञा के रूप को वाक्य में उसकी भूमिका के आधार पर बदलती है।',
            examples: [
                { case: 'Nominative', example: 'लड़का दौड़ता है। ("लड़का" विषय है।)' },
                { case: 'Accusative', example: 'मैं लड़के को देखता हूँ। ("लड़के को" कर्म है।)' },
                { case: 'Dative', example: 'मैं लड़के को खाना देता हूँ। ("लड़के को" अप्रत्यक्ष कर्म है।)' },
                { case: 'Genitive', example: 'यह लड़के का घर है। ("लड़के का" स्वामित्व दर्शाता है।)' },
            ]
        },
        {
            title: 'प्रत्यय',
            content: 'हिंदी में प्रत्यय संज्ञा और विशेषणों के अंत में जोड़कर उनके अर्थ में बदलाव लाते हैं।',
            examples: [
                { case: 'ता प्रत्यय', example: 'लड़का से लड़कापन।' },
                { case: 'पन प्रत्यय', example: 'अच्छा से अच्छाई।' },
            ]
        },
        {
            title: 'समास',
            content: 'हिंदी में समास दो या दो से अधिक शब्दों को मिलाकर एक नया शब्द बनाते हैं।',
            examples: [
                { case: 'अव्ययीभाव', example: 'रात्रि के बाद - "प्रातःकाल"' },
                { case: 'द्वन्द्व', example: 'राम और श्याम - "राम-श्याम"' },
            ]
        },
        {
            title: 'वाच्य (Active and Passive Voice)',
            content: 'वाच्य वाक्य की उस संरचना को कहते हैं जिसमें क्रिया का रूप बदलता है।',
            examples: [
                { case: 'Active Voice', example: 'राम ने खाना खाया।' },
                { case: 'Passive Voice', example: 'खाना राम द्वारा खाया गया।' },
            ]
        },
        {
            title: 'कारक',
            content: 'हिंदी में कारक वह होता है जो संज्ञा और सर्वनाम की क्रिया के साथ संबंध बताता है।',
            examples: [
                { case: 'कर्तृ कारक', example: 'राम पढ़ता है। (राम कर्ता है)' },
                { case: 'कर्म कारक', example: 'राम ने किताब पढ़ी। (किताब कर्म है)' },
            ]
        }
    ];

    const handleNextTopic = () => {
        if (currentTopicIndex < grammarTopics.length - 1) {
            setCurrentTopicIndex(currentTopicIndex + 1); // Move to the next topic
        } else {
            alert("आपने सभी विषय पूरे कर लिए हैं!");
        }
    };

    // Navigate to the practice page
    const handlePracticeClick = () => {
        navigate('/hindiprac'); // This will navigate to the HindiPractice page
    };

    const currentTopic = grammarTopics[currentTopicIndex]; // Get the current topic based on index

    return (
        <div className="intermediate-hindi-container">
            <h2>मध्यवर्ती हिंदी व्याकरण के पाठ</h2>
            <p>विषय चुनें और उदाहरणों के साथ सीखें।</p>

            <div className="topic-content">
                <h3>{currentTopic.title}</h3>
                <p>{currentTopic.content}</p>
                
                <h4>उदाहरण:</h4>
                <ul>
                    {currentTopic.examples.map((example, index) => (
                        <li key={index}>
                            <strong>{example.case}:</strong> {example.example}
                        </li>
                    ))}
                </ul>

                <button onClick={handleNextTopic}>
                    {currentTopicIndex < grammarTopics.length - 1 ? 'अगला विषय' : 'समाप्त करें'}
                </button>

                {/* Practice button to navigate to the practice page */}
                {currentTopicIndex === grammarTopics.length - 1 && (
                    <button onClick={handlePracticeClick} className="practice-button">
                        Go To Practice
                    </button>
                )}
            </div>
        </div>
    );
};

export default IntermediateHindi;
