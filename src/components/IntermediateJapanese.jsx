import React, { useState } from 'react';
import './IntermediateJapanese.css'; // Make sure to update the CSS file for Japanese

const IntermediateJapanese = () => {
    const [currentTopicIndex, setCurrentTopicIndex] = useState(0); // Track the index of the current topic

    const grammarTopics = [
        {
            title: '助詞 (Particles)',
            content: 'In Japanese, particles are used to indicate the grammatical function of words in a sentence. Here are some examples:',
            examples: [
                { particle: 'は (wa)', example: '私は学生です。("I am a student.")' },
                { particle: 'が (ga)', example: '猫が好きです。("I like cats.")' },
                { particle: 'に (ni)', example: '学校に行きます。("I go to school.")' },
                { particle: 'で (de)', example: '図書館で勉強します。("I study at the library.")' },
            ]
        },
        {
            title: '動詞の活用 (Verb Conjugation)',
            content: 'Japanese verbs change depending on the tense and politeness level. Here are some examples:',
            examples: [
                { tense: 'Present (Non-past)', example: '食べる (Taberu) - "I eat" or "I will eat"' },
                { tense: 'Past', example: '食べた (Tabeta) - "I ate"' },
                { tense: 'Te-form', example: '食べて (Tabete) - "Eating (used for requests, connections)"' },
                { tense: 'Negative', example: '食べない (Tabenai) - "I do not eat"' },
            ]
        },
        {
            title: '敬語 (Keigo - Honorifics)',
            content: 'Keigo is used to show respect in Japanese. Here are examples of polite expressions:',
            examples: [
                { type: 'Sonkeigo (Respectful)', example: '先生がいらっしゃいます。("The teacher is coming.")' },
                { type: 'Kenjougo (Humble)', example: '私は行かせていただきます。("I will go humbly.")' },
            ]
        },
        {
            title: '疑問詞 (Question Words)',
            content: 'In Japanese, question words are used to ask questions. Here are some common ones:',
            examples: [
                { word: '何 (nani)', example: '何をしますか？("What will you do?")' },
                { word: 'どこ (doko)', example: 'どこに行きますか？("Where are you going?")' },
                { word: '誰 (dare)', example: '誰が来ましたか？("Who came?")' },
                { word: 'いつ (itsu)', example: 'いつ帰りますか？("When are you going home?")' },
            ]
        },
        {
            title: '形容詞 (Adjectives)',
            content: 'Japanese adjectives describe the state or quality of things. There are two main types: i-adjectives and na-adjectives.',
            examples: [
                { type: 'i-adjective', example: '高い (takai) - "high, expensive"' },
                { type: 'na-adjective', example: '静か (shizuka) - "quiet"' },
            ]
        }
    ];

    const handleNextTopic = () => {
        if (currentTopicIndex < grammarTopics.length - 1) {
            setCurrentTopicIndex(currentTopicIndex + 1); // Move to the next topic
        } else {
            alert("You have completed all topics!");
        }
    };

    const currentTopic = grammarTopics[currentTopicIndex]; // Get the current topic based on index

    return (
        <div className="intermediate-japanese-container">
            <h2>Intermediate Japanese Grammar Lessons</h2>
            <p>Select a topic to learn and review examples.</p>

            <div className="topic-content">
                <h3>{currentTopic.title}</h3>
                <p>{currentTopic.content}</p>
                
                <h4>Examples:</h4>
                <ul>
                    {currentTopic.examples.map((example, index) => (
                        <li key={index}>
                            <strong>{example.particle || example.tense || example.type}:</strong> {example.example}
                        </li>
                    ))}
                </ul>

                <button onClick={handleNextTopic}>
                    {currentTopicIndex < grammarTopics.length - 1 ? 'Next Topic' : 'Finish'}
                </button>
            </div>
        </div>
    );
};

export default IntermediateJapanese;
