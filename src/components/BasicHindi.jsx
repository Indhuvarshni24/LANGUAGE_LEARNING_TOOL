import React from 'react';
import './BasicHindi.css'; // Ensure to create this CSS file for Basic Hindi page
import { useNavigate } from 'react-router-dom';

const BasicHindi = () => {
    const navigate = useNavigate(); // Initialize navigate function

    const letters = [
        { letter: 'अ', pronunciation: 'A', audioFile: '/audio/h1.mp3' },
        { letter: 'आ', pronunciation: 'Aa', audioFile: '/audio/h2.mp3' },
        { letter: 'इ', pronunciation: 'I', audioFile: '/audio/h3.mp3' },
        { letter: 'ई', pronunciation: 'Ee', audioFile: '/audio/h4.mp3' },
        { letter: 'उ', pronunciation: 'U', audioFile: '/audio/h5.mp3' },
        { letter: 'ऊ', pronunciation: 'Oo', audioFile: '/audio/h6.mp3' },
        { letter: 'ए', pronunciation: 'E', audioFile: '/audio/h7.mp3' },
        { letter: 'ऐ', pronunciation: 'Ai', audioFile: '/audio/h8.mp3' },
        { letter: 'ओ', pronunciation: 'O', audioFile: '/audio/h9.mp3' },
        { letter: 'औ', pronunciation: 'Au', audioFile: '/audio/h10.mp3' },
        { letter: 'क', pronunciation: 'Ka', audioFile: '/audio/h11.mp3' },
        { letter: 'ख', pronunciation: 'Kha', audioFile: '/audio/h12.mp3' },
        { letter: 'ग', pronunciation: 'Ga', audioFile: '/audio/h13.mp3' },
        { letter: 'घ', pronunciation: 'Gha', audioFile: '/audio/h14.mp3' },
        { letter: 'च', pronunciation: 'Cha', audioFile: '/audio/h15.mp3' },
        { letter: 'छ', pronunciation: 'Chha', audioFile: '/audio/h16.mp3' },
        { letter: 'ज', pronunciation: 'Ja', audioFile: '/audio/h17.mp3' },
        
    ];
    
    const playAudio = (audioFile) => {
        const audio = new Audio(audioFile);
        audio.play(); // Play the audio for the letter
    };

    const handlePracticeClick = () => {
        navigate('/hindipractice'); // Navigate to the Hindi practice page
    };

    return (
        <div className="basic-hindi">
            <button className="practice-button" onClick={handlePracticeClick}>Practice</button>
            <h2>Learn Basic Hindi Letters and Pronunciation</h2>
            <div className="letter-container">
                {letters.map((item, index) => (
                    <div key={index} className="letter-card">
                        <span className="letter">{item.letter}</span>
                        <span className="pronunciation">{item.pronunciation}</span>
                        {/* Speaker icon that triggers pronunciation */}
                        <span 
                            className="speaker-icon" 
                            onClick={() => playAudio(item.audioFile)}
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

export default BasicHindi;
