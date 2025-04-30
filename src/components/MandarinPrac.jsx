import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './MandarinPrac.css';

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

// Main MandarinPractice component
const MandarinPrac = () => {
    const sentences = [
        {
            sentence: '我想喝___水。',
            correctWords: ['一些'],
            words: ['一些', '一杯', '两瓶', '三碗'],
        },
        {
            sentence: '我去___学校。',
            correctWords: ['到'],
            words: ['去', '到', '上', '下'],
        },
        {
            sentence: '他___很高。',
            correctWords: ['非常'],
            words: ['非常', '不', '有点', '很'],
        },
        {
            sentence: '她___喜欢吃水果。',
            correctWords: ['特别'],
            words: ['特别', '也', '总是', '不'],
        },
        {
            sentence: '我们___去旅行。',
            correctWords: ['打算'],
            words: ['打算', '希望', '能够', '已'],
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
            <div className="mandarin-practice">
                <h2>拖放练习</h2>
                <p>将正确的词语拖到空白处完成句子。</p>
                {completedSentences.map((sentence, sentenceIndex) => (
                    <div key={sentenceIndex} className="sentence-container">
                        <p>
                            <strong>问题 {sentenceIndex + 1}:</strong>{' '}
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
                                    ? '正确'
                                    : `错误 - 正确答案: ${sentence.correctWords.join(', ')}`}
                            </p>
                        )}
                    </div>
                ))}
                {!showFinalResult ? (
                    <button onClick={checkAllAnswers}>检查所有答案</button>
                ) : (
                    <p className="final-score">您的最终得分: {score} / {sentences.length}</p>
                )}
            </div>
        </DndProvider>
    );
};

export default MandarinPrac;
