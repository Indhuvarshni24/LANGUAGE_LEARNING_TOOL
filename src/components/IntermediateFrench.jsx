import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './IntermediateFrench.css';

const IntermediateFrench = () => {
    const [currentTopicIndex, setCurrentTopicIndex] = useState(0); // Track the index of the current topic
    const navigate = useNavigate(); // Initialize navigate function

    const grammarTopics = [
        {
            title: 'Les Articles (Définis, Indéfinis, Partitifs)',
            content: 'En français, les articles indiquent le genre et le nombre des noms. Voici des exemples pour chaque type :',
            examples: [
                { case: 'Défini', example: 'Le chat. (The cat.)' },
                { case: 'Indéfini', example: 'Un chat. (A cat.)' },
                { case: 'Partitif', example: 'Du pain. (Some bread.)' },
            ]
        },
        {
            title: 'Les Verbes Pronominaux',
            content: 'Les verbes pronominaux sont utilisés lorsque l\'action se reflète sur le sujet. Voici des exemples :',
            examples: [
                { case: 'Se lever', example: 'Je me lève. (I get up.)' },
                { case: 'Se coucher', example: 'Il se couche tôt. (He goes to bed early.)' },
            ]
        },
        {
            title: 'Les Conjugaisons des Verbes en Différents Temps',
            content: 'Les verbes français se conjuguent différemment en fonction du temps. Voici des exemples :',
            examples: [
                { case: 'Présent', example: 'Je parle. (I speak.)' },
                { case: 'Passé Composé', example: 'J\'ai parlé. (I spoke.)' },
                { case: 'Futur Simple', example: 'Je parlerai. (I will speak.)' },
            ]
        },
        {
            title: 'Les Verbes Modaux',
            content: 'Les verbes modaux expriment la capacité, la permission ou la nécessité. Voici des exemples :',
            examples: [
                { case: 'Pouvoir', example: 'Je peux parler. (I can speak.)' },
                { case: 'Devoir', example: 'Je dois étudier. (I must study.)' },
            ]
        },
        {
            title: 'Les Adjectifs et Leur Accord',
            content: 'Les adjectifs en français s\'accordent en genre et en nombre avec le nom. Voici des exemples :',
            examples: [
                { case: 'Masculin Singulier', example: 'Le chat noir. (The black cat.)' },
                { case: 'Féminin Singulier', example: 'La chatte noire. (The black cat.)' },
                { case: 'Pluriel', example: 'Les chats noirs. (The black cats.)' },
            ]
        }
    ];

    const handleNextTopic = () => {
        if (currentTopicIndex < grammarTopics.length - 1) {
            setCurrentTopicIndex(currentTopicIndex + 1); // Move to the next topic
        } else {
            alert("Vous avez terminé tous les sujets !");
        }
    };

    // Navigate to the practice page
    const handlePracticeClick = () => {
        navigate('/frenchprac'); // This will navigate to the FrenchPractice page
    };

    const currentTopic = grammarTopics[currentTopicIndex]; // Get the current topic based on index

    return (
        <div className="intermediate-french-container">
            <h2>Leçons de Grammaire Français Intermédiaire</h2>
            <p>Sélectionnez un sujet pour apprendre et revoir des exemples.</p>

            <div className="topic-content">
                <h3>{currentTopic.title}</h3>
                <p>{currentTopic.content}</p>
                
                <h4>Exemples :</h4>
                <ul>
                    {currentTopic.examples.map((example, index) => (
                        <li key={index}>
                            <strong>{example.case} :</strong> {example.example}
                        </li>
                    ))}
                </ul>

                <button onClick={handleNextTopic}>
                    {currentTopicIndex < grammarTopics.length - 1 ? 'Sujet Suivant' : 'Terminer'}
                </button>

                {/* Practice button to navigate to the practice page */}
                {currentTopicIndex === grammarTopics.length - 1 && (
                    <button onClick={handlePracticeClick} className="practice-button">
                        Aller à la Page de Pratique
                    </button>
                )}
            </div>
        </div>
    );
};

export default IntermediateFrench;
