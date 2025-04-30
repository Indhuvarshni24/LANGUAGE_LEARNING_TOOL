import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './IntermediateGerman.css';

const IntermediateGerman = () => {
    const [currentTopicIndex, setCurrentTopicIndex] = useState(0); // Track the index of the current topic
    const navigate = useNavigate(); // Initialize navigate function

    const grammarTopics = [
        {
            title: 'Cases (Nominative, Accusative, Dative, Genitive)',
            content: 'In German, cases indicate the role that nouns and pronouns play in a sentence. Here are examples for each case:',
            examples: [
                { case: 'Nominative', example: 'Der Hund läuft. (The dog runs.) - "Der Hund" is the subject.' },
                { case: 'Accusative', example: 'Ich sehe den Hund. (I see the dog.) - "den Hund" is the direct object.' },
                { case: 'Dative', example: 'Ich gebe dem Hund das Futter. (I give the dog the food.) - "dem Hund" is the indirect object.' },
                { case: 'Genitive', example: 'Das ist das Haus des Hundes. (That is the dog\'s house.) - "des Hundes" shows possession.' },
            ]
        },
        {
            title: 'Separable and Inseparable Verbs',
            content: 'In German, some verbs have prefixes that may separate in certain tenses. Here are examples:',
            examples: [
                { case: 'Separable', example: 'Ich rufe dich an. (I call you.) - "anrufen" splits into "rufe ... an".' },
                { case: 'Inseparable', example: 'Ich verstehe dich. (I understand you.) - "verstehen" does not split.' },
            ]
        },
        {
            title: 'Verb Conjugations in Different Tenses',
            content: 'German verbs conjugate differently depending on tense. Here are some examples:',
            examples: [
                { case: 'Present Tense', example: 'Ich gehe. (I go.) - Simple present form.' },
                { case: 'Past Tense', example: 'Ich ging. (I went.) - Simple past form.' },
                { case: 'Present Perfect', example: 'Ich bin gegangen. (I have gone.) - Compound past form used in conversation.' },
            ]
        },
        {
            title: 'Modal Verbs',
            content: 'Modal verbs express ability, permission, or necessity. Examples include:',
            examples: [
                { case: 'Können', example: 'Ich kann Deutsch sprechen. (I can speak German.)' },
                { case: 'Müssen', example: 'Ich muss lernen. (I must learn.)' },
            ]
        },
        {
            title: 'Adjective Endings',
            content: 'Adjective endings in German depend on gender, case, and number. Examples include:',
            examples: [
                { case: 'Nominative', example: 'Der große Hund. (The big dog.)' },
                { case: 'Accusative', example: 'Ich sehe den großen Hund. (I see the big dog.)' },
            ]
        }
    ];

    const handleNextTopic = () => {
        if (currentTopicIndex < grammarTopics.length - 1) {
            setCurrentTopicIndex(currentTopicIndex + 1); // Move to the next topic
        } else {
            alert("You've completed all topics!");
        }
    };

    // Navigate to the practice page
    const handlePracticeClick = () => {
        navigate('/germanprac'); // This will navigate to the GermanPractice page
    };

    const currentTopic = grammarTopics[currentTopicIndex]; // Get the current topic based on index

    return (
        <div className="intermediate-german-container">
            <h2>Intermediate German Grammar Lessons</h2>
            <p>Select a topic to learn and review examples.</p>

            <div className="topic-content">
                <h3>{currentTopic.title}</h3>
                <p>{currentTopic.content}</p>
                
                <h4>Examples:</h4>
                <ul>
                    {currentTopic.examples.map((example, index) => (
                        <li key={index}>
                            <strong>{example.case}:</strong> {example.example}
                        </li>
                    ))}
                </ul>

                <button onClick={handleNextTopic}>
                    {currentTopicIndex < grammarTopics.length - 1 ? 'Next Topic' : 'Finish'}
                </button>

                {/* Practice button to navigate to the practice page */}
                {currentTopicIndex === grammarTopics.length - 1 && (
                    <button onClick={handlePracticeClick} className="practice-button">
                        Go to Practice Page
                    </button>
                )}
            </div>
        </div>
    );
};

export default IntermediateGerman;
