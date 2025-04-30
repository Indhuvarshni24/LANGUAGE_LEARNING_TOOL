import React from 'react';
import './BasicGerman.css';
import { useNavigate } from 'react-router-dom';

const BasicGerman = () => {
    const navigate = useNavigate(); // Initialize navigate function

    const letters = [
        { letter: 'A', pronunciation: 'Ah' },
        { letter: 'Ä', pronunciation: 'Eh' },
        { letter: 'B', pronunciation: 'Bay' },
        { letter: 'C', pronunciation: 'Tsay' },
        { letter: 'D', pronunciation: 'Day' },
        { letter: 'E', pronunciation: 'Eh' },
        { letter: 'F', pronunciation: 'Eff' },
        { letter: 'G', pronunciation: 'Gay' },
        { letter: 'H', pronunciation: 'Ha' },
        { letter: 'I', pronunciation: 'Ee' },
        { letter: 'J', pronunciation: 'Yot' },
        { letter: 'K', pronunciation: 'Ka' },
        { letter: 'L', pronunciation: 'El' },
        { letter: 'M', pronunciation: 'Em' },
        { letter: 'N', pronunciation: 'En' },
        { letter: 'O', pronunciation: 'Oh' },
        { letter: 'Ö', pronunciation: 'Er' },
        { letter: 'P', pronunciation: 'Pay' },
        { letter: 'Q', pronunciation: 'Ku' },
        { letter: 'R', pronunciation: 'Er' },
        { letter: 'S', pronunciation: 'Es' },
        { letter: 'ß', pronunciation: 'Eszett' },
        { letter: 'T', pronunciation: 'Tay' },
        { letter: 'U', pronunciation: 'Uh' },
        { letter: 'Ü', pronunciation: 'Ue' },
        { letter: 'V', pronunciation: 'Fow' },
        { letter: 'W', pronunciation: 'Vay' },
        { letter: 'X', pronunciation: 'Ix' },
        { letter: 'Y', pronunciation: 'Upsilon' },
        { letter: 'Z', pronunciation: 'Tset' },
    ];

    const pronounceWord = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'de-DE'; // Set language to German
        window.speechSynthesis.speak(utterance);
    };

    // Navigate to the Practice page when Practice button is clicked
    const handlePracticeClick = () => {
        navigate('/practice'); // This will navigate to the PracticePage
    };

    return (
        <div className="basic-german">
            <button className="practice-button" onClick={handlePracticeClick}>Practice</button>
            <h2>Learn Basic German Letters and Pronunciation</h2>
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

export default BasicGerman;
