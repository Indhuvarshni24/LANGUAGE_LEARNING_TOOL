import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './IntermediateMandarin.css'; // Make sure to update the CSS file for Mandarin

const IntermediateMandarin = () => {
    const [currentTopicIndex, setCurrentTopicIndex] = useState(0); // Track the index of the current topic
    const navigate = useNavigate(); // Initialize navigate function

    const grammarTopics = [
        {
            title: 'Chinese Sentence Structure',
            content: 'Mandarin Chinese typically follows a Subject-Verb-Object (SVO) structure. Here are some examples:',
            examples: [
                { case: 'SVO', example: '我吃苹果 (Wǒ chī píngguǒ). (I eat an apple.)' },
                { case: 'SVO', example: '他喝水 (Tā hē shuǐ). (He drinks water.)' },
            ]
        },
        {
            title: 'Measure Words (量词)',
            content: 'In Mandarin, measure words are used when counting objects. These words are placed between a number and the noun.',
            examples: [
                { case: 'Measure Word', example: '一杯水 (Yī bēi shuǐ). (A cup of water.)' },
                { case: 'Measure Word', example: '三本书 (Sān běn shū). (Three books.)' },
            ]
        },
        {
            title: 'Tones in Mandarin',
            content: 'Mandarin Chinese has four main tones, and the tone of a word can change its meaning. Here are some examples:',
            examples: [
                { case: 'Tone 1', example: '妈 (mā) - mother (First tone)' },
                { case: 'Tone 2', example: '麻 (má) - hemp (Second tone)' },
                { case: 'Tone 3', example: '马 (mǎ) - horse (Third tone)' },
                { case: 'Tone 4', example: '骂 (mà) - scold (Fourth tone)' },
            ]
        },
        {
            title: 'Question Words',
            content: 'Mandarin has several question words to ask about different things. Here are some examples:',
            examples: [
                { case: 'What', example: '什么 (Shénme) - What?' },
                { case: 'Where', example: '哪里 (Nǎlǐ) - Where?' },
                { case: 'Who', example: '谁 (Shuí) - Who?' },
                { case: 'How', example: '怎么 (Zěnme) - How?' },
            ]
        },
        {
            title: 'Use of 了 (Le)',
            content: 'The particle 了 (le) is used to indicate a completed action or a change of state. Examples:',
            examples: [
                { case: 'Action Completed', example: '我吃了 (Wǒ chīle) - I have eaten.' },
                { case: 'Change of State', example: '他走了 (Tā zǒule) - He has left.' },
            ]
        }
    ];

    const handleNextTopic = () => {
        if (currentTopicIndex < grammarTopics.length - 1) {
            setCurrentTopicIndex(currentTopicIndex + 1); // Move to the next topic
        } else {
            alert("你已经完成了所有的主题！");
        }
    };

    // Navigate to the practice page
    const handlePracticeClick = () => {
        navigate('/mandarinprac'); // This will navigate to the MandarinPrac page
    };

    const currentTopic = grammarTopics[currentTopicIndex]; // Get the current topic based on index

    return (
        <div className="intermediate-mandarin-container">
            <h2>中级汉语语法课程</h2>
            <p>选择一个主题进行学习并复习例子。</p>

            <div className="topic-content">
                <h3>{currentTopic.title}</h3>
                <p>{currentTopic.content}</p>
                
                <h4>例子：</h4>
                <ul>
                    {currentTopic.examples.map((example, index) => (
                        <li key={index}>
                            <strong>{example.case}：</strong> {example.example}
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

export default IntermediateMandarin;
