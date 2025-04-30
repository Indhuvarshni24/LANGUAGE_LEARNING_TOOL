import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './GermanPrac.css';

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

// Main GermanPractice component
const GermanPrac = () => {
    const sentences = [
        {
            sentence: 'Ich sehe ___ Hund.',
            correctWords: ['den'],
            words: ['den', 'dem', 'der', 'die'],
        },
        {
            sentence: 'Das ist ___ Auto meines Freundes.',
            correctWords: ['das'],
            words: ['das', 'den', 'die', 'dem'],
        },
        {
            sentence: 'Ich gebe ___ Mann ein Geschenk.',
            correctWords: ['dem'],
            words: ['der', 'dem', 'den', 'die'],
        },
        {
            sentence: 'Er liebt ___ Stadt.',
            correctWords: ['die'],
            words: ['die', 'den', 'das', 'dem'],
        },
        {
            sentence: 'Sie schreibt ___ Buch.',
            correctWords: ['ein'],
            words: ['ein', 'den', 'die', 'das'],
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
            <div className="german-practice">
                <h2>Drag and Drop Practice</h2>
                <p>Drag the correct words into the blanks to complete the sentences correctly.</p>
                {completedSentences.map((sentence, sentenceIndex) => (
                    <div key={sentenceIndex} className="sentence-container">
                        <p>
                            <strong>Question {sentenceIndex + 1}:</strong>{' '}
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
                                    ? 'Correct'
                                    : `Incorrect - Correct answer: ${sentence.correctWords.join(', ')}`}
                            </p>
                        )}
                    </div>
                ))}
                {!showFinalResult ? (
                    <button onClick={checkAllAnswers}>Check All Answers</button>
                ) : (
                    <p className="final-score">Your final score: {score} / {sentences.length}</p>
                )}
            </div>
        </DndProvider>
    );
};

export default GermanPrac;
