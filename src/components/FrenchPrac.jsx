import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './FrenchPrac.css';

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

// Main FrenchPractice component
const FrenchPrac = () => {
    const sentences = [
        {
            sentence: 'Je vais ___ école.',
            correctWords: ['à l\''],
            words: ['à l\'', 'à la', 'au', 'dans'],
        },
        {
            sentence: 'Elle est ___ amie.',
            correctWords: ['mon'],
            words: ['mon', 'ma', 'mes', 'ton'],
        },
        {
            sentence: 'Nous avons ___ idées.',
            correctWords: ['des'],
            words: ['des', 'le', 'la', 'un'],
        },
        {
            sentence: 'Ils mangent ___ fruits.',
            correctWords: ['des'],
            words: ['des', 'le', 'les', 'du'],
        },
        {
            sentence: 'Il parle ___ anglais.',
            correctWords: ['bien'],
            words: ['bien', 'mal', 'beaucoup', 'peu'],
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
            <div className="french-practice">
                <h2>Exercice de Drag and Drop</h2>
                <p>Complétez les phrases en insérant les bons mots dans les blancs.</p>
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
                                    ? 'Bonne réponse'
                                    : `Mauvaise réponse - La bonne réponse est : ${sentence.correctWords.join(', ')}`}
                            </p>
                        )}
                    </div>
                ))}
                {!showFinalResult ? (
                    <button onClick={checkAllAnswers}>Vérifier les réponses</button>
                ) : (
                    <p className="final-score">Votre score final : {score} / {sentences.length}</p>
                )}
            </div>
        </DndProvider>
    );
};

export default FrenchPrac;
