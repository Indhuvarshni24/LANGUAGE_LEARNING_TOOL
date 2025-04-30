import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './HindiPrac.css';

const ItemType = 'WORD'; // Define the item type for drag and drop

// Draggable word component
const DraggableWord = ({ word }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemType,
        item: { word },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <span ref={drag} className="draggable-word" style={{ opacity: isDragging ? 0.5 : 1 }}>
            {word}
        </span>
    );
};

// Droppable blank component
const DroppableBlank = ({ word, onDrop, isCorrect }) => {
    const [{ isOver }, drop] = useDrop({
        accept: ItemType,
        drop: (item) => onDrop(item.word),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <span
            ref={drop}
            className={`blank ${isCorrect ? 'correct' : ''}`}
            style={{ backgroundColor: isOver ? '#ddd' : '#fff' }}
        >
            {word || '____'}
        </span>
    );
};

// Main HindiPractice component
const HindiPrac = () => {
    const sentences = [
        {
            sentence: 'मैं ___ घर जाता हूँ।',
            correctWords: ['अपने'],
            words: ['अपने', 'उस', 'यह', 'उसके'],
        },
        {
            sentence: 'यह ___ किताब है।',
            correctWords: ['मेरी'],
            words: ['मेरी', 'तेरी', 'उसकी', 'हमारी'],
        },
        {
            sentence: 'वह ___ अच्छा गाता है।',
            correctWords: ['बहुत'],
            words: ['बहुत', 'कम', 'ज्यादा', 'थोड़ा'],
        },
        {
            sentence: 'मैंने ___ खाया।',
            correctWords: ['खाना'],
            words: ['खाना', 'पानी', 'फल', 'रोटी'],
        },
        {
            sentence: 'वह ___ स्कूल जा रही है।',
            correctWords: ['अपने'],
            words: ['अपने', 'उसका', 'उनके', 'उस'],
        },
    ];

    const [completedSentences, setCompletedSentences] = useState(
        sentences.map((sentence) => ({
            ...sentence,
            userWords: Array(sentence.correctWords.length).fill(null),
        }))
    );
    const [showFinalResult, setShowFinalResult] = useState(false);
    const [score, setScore] = useState(0);

    const handleDrop = (word, blankIndex, sentenceIndex) => {
        setCompletedSentences((prevSentences) =>
            prevSentences.map((sentence, sIdx) => {
                if (sIdx === sentenceIndex) {
                    const newWords = [...sentence.userWords];
                    newWords[blankIndex] = word;
                    return { ...sentence, userWords: newWords };
                }
                return sentence;
            })
        );
    };

    const checkAllAnswers = () => {
        // Calculate score based on correct answers
        const calculatedScore = completedSentences.reduce((acc, sentence) => {
            return acc + (sentence.userWords.join('') === sentence.correctWords.join('') ? 1 : 0);
        }, 0);
        setScore(calculatedScore);
        setShowFinalResult(true);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="hindi-practice">
                <h2>ड्रैग और ड्रॉप अभ्यास</h2>
                <p>सही शब्दों को रिक्त स्थान में डालकर वाक्य पूरा करें।</p>
                {completedSentences.map((sentence, sentenceIndex) => (
                    <div key={sentenceIndex} className="sentence-container">
                        <p>
                            <strong>प्रश्न {sentenceIndex + 1}:</strong>{' '}
                            {sentence.sentence.split('___').map((part, index) => (
                                <React.Fragment key={index}>
                                    {part}
                                    {index < sentence.correctWords.length && (
                                        <DroppableBlank
                                            word={sentence.userWords[index]}
                                            onDrop={(word) => handleDrop(word, index, sentenceIndex)}
                                            isCorrect={showFinalResult && sentence.userWords[index] === sentence.correctWords[index]}
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </p>
                        <div className="words-container">
                            {sentence.words.map((word, wordIndex) => (
                                <DraggableWord key={wordIndex} word={word} />
                            ))}
                        </div>
                        {showFinalResult && (
                            <p className={`result ${sentence.userWords.join('') === sentence.correctWords.join('') ? 'correct' : 'incorrect'}`}>
                                {sentence.userWords.join('') === sentence.correctWords.join('')
                                    ? 'Correct Answer'
                                    : `Wrong - Correct Answer: ${sentence.correctWords.join(', ')}`}
                            </p>
                        )}
                    </div>
                ))}
                {!showFinalResult ? (
                    <button onClick={checkAllAnswers}>Check answer</button>
                ) : (
                    <p className="final-score">आपका अंतिम स्कोर: {score} / {sentences.length}</p>
                )}
            </div>
        </DndProvider>
    );
};

export default HindiPrac;
