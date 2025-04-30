import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './IntermediateSpanish.css'; // Make sure to update the CSS file for Spanish

const IntermediateSpanish = () => {
    const [currentTopicIndex, setCurrentTopicIndex] = useState(0); // Track the index of the current topic
    const navigate = useNavigate(); // Initialize navigate function

    const grammarTopics = [
        {
            title: 'La Estructura de la Oración en Español',
            content: 'En español, la estructura básica de la oración sigue el orden Sujeto-Verbo-Objeto. Aquí algunos ejemplos:',
            examples: [
                { case: 'SVO', example: 'Yo como una manzana.' },
                { case: 'SVO', example: 'Él bebe agua.' },
            ]
        },
        {
            title: 'Los Pronombres Personales',
            content: 'Los pronombres personales en español se usan para sustituir los sustantivos. Ejemplos:',
            examples: [
                { case: 'Sujeto', example: 'Yo soy estudiante.' },
                { case: 'Objeto Directo', example: 'Ella me ve.' },
            ]
        },
        {
            title: 'Tiempos Verbales en Español',
            content: 'En español, los verbos se conjugan en diferentes tiempos. Ejemplos:',
            examples: [
                { case: 'Presente', example: 'Yo hablo español.' },
                { case: 'Pasado', example: 'Yo hablé español ayer.' },
                { case: 'Futuro', example: 'Yo hablaré español mañana.' },
            ]
        },
        {
            title: 'El Uso de Ser y Estar',
            content: 'En español, usamos "ser" y "estar" para expresar diferentes estados. Ejemplos:',
            examples: [
                { case: 'Ser', example: 'Yo soy feliz.' },
                { case: 'Estar', example: 'Yo estoy cansado.' },
            ]
        },
        {
            title: 'El Subjuntivo',
            content: 'El subjuntivo se usa para expresar deseos, dudas y situaciones hipotéticas. Ejemplos:',
            examples: [
                { case: 'Deseo', example: 'Ojalá que venga a la fiesta.' },
                { case: 'Duda', example: 'No creo que él haya llegado.' },
            ]
        }
    ];

    const handleNextTopic = () => {
        if (currentTopicIndex < grammarTopics.length - 1) {
            setCurrentTopicIndex(currentTopicIndex + 1); // Move to the next topic
        } else {
            alert("¡Has completado todos los temas!");
        }
    };

    // Navigate to the practice page
    const handlePracticeClick = () => {
        navigate('/spanishprac'); // This will navigate to the SpanishPrac page
    };

    const currentTopic = grammarTopics[currentTopicIndex]; // Get the current topic based on index

    return (
        <div className="intermediate-spanish-container">
            <h2>Lecciones de Gramática Intermedia en Español</h2>
            <p>Selecciona un tema para aprender y repasar ejemplos.</p>

            <div className="topic-content">
                <h3>{currentTopic.title}</h3>
                <p>{currentTopic.content}</p>
                
                <h4>Ejemplos:</h4>
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

export default IntermediateSpanish;
