import React from 'react';
import './BasicFrench.css';
import { useNavigate } from 'react-router-dom';

const BasicFrench = () => {
    const navigate = useNavigate(); // Initialize navigate function

    const letters = [
        { letter: 'A', pronunciation: 'Ah' },
        { letter: 'B', pronunciation: 'Bay' },
        { letter: 'C', pronunciation: 'Say' },
        { letter: 'D', pronunciation: 'Day' },
        { letter: 'E', pronunciation: 'Eh' },
        { letter: 'F', pronunciation: 'Eff' },
        { letter: 'G', pronunciation: 'Jay' },
        { letter: 'H', pronunciation: 'Ash' },
        { letter: 'I', pronunciation: 'Ee' },
        { letter: 'J', pronunciation: 'Zhee' },
        { letter: 'K', pronunciation: 'Kah' },
        { letter: 'L', pronunciation: 'Ell' },
        { letter: 'M', pronunciation: 'Em' },
        { letter: 'N', pronunciation: 'En' },
        { letter: 'O', pronunciation: 'Oh' },
        { letter: 'P', pronunciation: 'Pay' },
        { letter: 'Q', pronunciation: 'Koo' },
        { letter: 'R', pronunciation: 'Air' },
        { letter: 'S', pronunciation: 'Es' },
        { letter: 'T', pronunciation: 'Tay' },
        { letter: 'U', pronunciation: 'Oo' },
        { letter: 'V', pronunciation: 'Vay' },
        { letter: 'W', pronunciation: 'Dooble-vay' },
        { letter: 'X', pronunciation: 'Eeks' },
        { letter: 'Y', pronunciation: 'Ee-grek' },
        { letter: 'Z', pronunciation: 'Zed' },
    ];

    const pronounceWord = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fr-FR'; // Set language to French
        window.speechSynthesis.speak(utterance);
    };

    // Navigate to the Practice page when Practice button is clicked
    const handlePracticeClick = () => {
        navigate('/practice'); // This will navigate to the PracticePage
    };

    return (
        <div className="basic-french">
            <button className="practice-button" onClick={handlePracticeClick}>Practice</button>
            <h2>Learn Basic French Letters and Pronunciation</h2>
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

export default BasicFrench;
