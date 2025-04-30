import React from 'react';
import './BasicSpanish.css';
import { useNavigate } from 'react-router-dom';

const BasicSpanish = () => {
    const navigate = useNavigate(); // Initialize navigate function

    const letters = [
        { letter: 'A', pronunciation: 'Ah' },
        { letter: 'B', pronunciation: 'Bay' },
        { letter: 'C', pronunciation: 'Say' },
        { letter: 'D', pronunciation: 'Day' },
        { letter: 'E', pronunciation: 'Eh' },
        { letter: 'F', pronunciation: 'Effay' },
        { letter: 'G', pronunciation: 'Hay' },
        { letter: 'H', pronunciation: 'Ah-chay' },
        { letter: 'I', pronunciation: 'Ee' },
        { letter: 'J', pronunciation: 'Hota' },
        { letter: 'K', pronunciation: 'Kah' },
        { letter: 'L', pronunciation: 'El-lay' },
        { letter: 'LL', pronunciation: 'Eh-yay' },
        { letter: 'M', pronunciation: 'Em-may' },
        { letter: 'N', pronunciation: 'En-nay' },
        { letter: 'Ñ', pronunciation: 'En-yay' },
        { letter: 'O', pronunciation: 'Oh' },
        { letter: 'P', pronunciation: 'Pay' },
        { letter: 'Q', pronunciation: 'Coo' },
        { letter: 'R', pronunciation: 'Air-ray' },
        { letter: 'RR', pronunciation: 'Air-rray' },
        { letter: 'S', pronunciation: 'Es-say' },
        { letter: 'T', pronunciation: 'Tay' },
        { letter: 'U', pronunciation: 'Oo' },
        { letter: 'V', pronunciation: 'Bay' },
        { letter: 'W', pronunciation: 'Dob-leh-vay' },
        { letter: 'X', pronunciation: 'Eh-kees' },
        { letter: 'Y', pronunciation: 'Ee-gri-ay-ga' },
        { letter: 'Z', pronunciation: 'Say-tah' },
    ];

    const pronounceWord = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES'; // Set language to Spanish
        window.speechSynthesis.speak(utterance);
    };

    // Navigate to the Practice page when Practice button is clicked
    const handlePracticeClick = () => {
        navigate('/practice2'); // This will navigate to the PracticePage
    };

    return (
        <div className="basic-spanish">
            <button className="practice-button" onClick={handlePracticeClick}>Practice</button>
            <h2>Learn Basic Spanish Letters and Pronunciation</h2>
            <div className="letter-container">
                {letters.map((item, index) => (
                    <div key={index} className="letter-card">
                        <span className="letter">{item.letter}</span>
                        <span className="pronunciation">{item.pronunciation}</span>
                        {/* Speaker icon that triggers pronunciation */}
                        <span 
                            className="speaker-icon" 
                            onClick={() => pronounceWord(item.letter)}
                            role="button" 
                            aria-label="Play pronunciation"
                        >
                            🔊
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BasicSpanish;
