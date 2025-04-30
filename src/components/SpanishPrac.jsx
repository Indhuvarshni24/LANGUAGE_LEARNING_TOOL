import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './SpanishPrac.css';

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

// Main SpanishPractice component
const SpanishPrac = () => {
    const sentences = [
        {
            sentence: 'Yo ___ una manzana.',
            correctWords: ['como'],
            words: ['como', 'como', 'es', 'estoy'],
        },
        {
            sentence: 'Ella ___ al cine.',
            correctWords: ['va'],
            words: ['va', 'vamos', 'fuimos', 'ir'],
        },
        {
            sentence: 'Nosotros ___ en la casa.',
            correctWords: ['estamos'],
            words: ['estamos', 'somos', 'está', 'fue'],
        },
        {
            sentence: '___ estudiante es muy inteligente.',
            correctWords: ['El'],
            words: ['El', 'La', 'Los', 'Una'],
        },
        {
            sentence: 'Tú ___ la respuesta correcta.',
            correctWords: ['tienes'],
            words: ['tienes', 'tenemos', 'tienen', 'tener'],
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
            <div className="spanish-practice">
                <h2>Arrastra y Suelta Ejercicio</h2>
                <p>Llena los espacios en blanco con la palabra correcta.</p>
                {completedSentences.map((sentence, sentenceIndex) => (
                    <div key={sentenceIndex} className="sentence-container">
                        <p>
                            <strong>Pregunta {sentenceIndex + 1}:</strong>{' '}
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
                            <p
                                className={`result ${
                                    sentence.userWords.join('') === sentence.correctWords.join('') ? 'correct' : 'incorrect'
                                }`}
                            >
                                {sentence.userWords.join('') === sentence.correctWords.join('')
                                    ? 'Respuesta Correcta'
                                    : `Incorrecto - Respuesta Correcta: ${sentence.correctWords.join(', ')}`}
                            </p>
                        )}
                    </div>
                ))}
                {!showFinalResult ? (
                    <button onClick={checkAllAnswers}>Revisar respuestas</button>
                ) : (
                    <p className="final-score">Tu puntaje final: {score} / {sentences.length}</p>
                )}
            </div>
        </DndProvider>
    );
};

export default SpanishPrac;
