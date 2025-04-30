import React from 'react';
import './BasicJapanese.css'; // Make sure to create this CSS file for Basic Japanese page
import { useNavigate } from 'react-router-dom';

const BasicJapanese = () => {
    const navigate = useNavigate();

    // Define letters with the path to their corresponding MP3 audio files
    const letters = [
        { letter: 'あ', pronunciation: 'Ah', audioFile: '/audio/j1.mp3' },
        { letter: 'い', pronunciation: 'Ee', audioFile: '/audio/j2.mp3' },
        { letter: 'う', pronunciation: 'U', audioFile: '/audio/j3.mp3' },
        { letter: 'え', pronunciation: 'Eh', audioFile: '/audio/j4.mp3' },
        { letter: 'お', pronunciation: 'Oh', audioFile: '/audio/j5.mp3' },
        { letter: 'か', pronunciation: 'Ka', audioFile: '/audio/j6.mp3' },
        { letter: 'き', pronunciation: 'Ki', audioFile: '/audio/j7.mp3' },
        { letter: 'く', pronunciation: 'Ku', audioFile: '/audio/j.mp3' },
        { letter: 'け', pronunciation: 'Ke', audioFile: '/audio/j8.mp3' },
        { letter: 'こ', pronunciation: 'Ko', audioFile: '/audio/j9.mp3' },
        { letter: 'さ', pronunciation: 'Sa', audioFile: '/audio/j10.mp3' },
        { letter: 'し', pronunciation: 'Shi', audioFile: '/audio/j11.mp3' },
        { letter: 'す', pronunciation: 'Su', audioFile: '/audio/j12.mp3' },
        { letter: 'せ', pronunciation: 'Se', audioFile: '/audio/j13.mp3' },
        { letter: 'そ', pronunciation: 'So', audioFile: '/audio/j14.mp3' },
        { letter: 'た', pronunciation: 'Ta', audioFile: '/audio/j15.mp3' },
        { letter: 'ち', pronunciation: 'Chi', audioFile: '/audio/j16.mp3' },
        { letter: 'つ', pronunciation: 'Tsu', audioFile: '/audio/j17.mp3' },
        { letter: 'て', pronunciation: 'Te', audioFile: '/audio/j18.mp3' },
        { letter: 'と', pronunciation: 'To', audioFile: '/audio/j19.mp3' },
        { letter: 'な', pronunciation: 'Na', audioFile: '/audio/j20.mp3' },
        { letter: 'に', pronunciation: 'Ni', audioFile: '/audio/j21.mp3' },
       
    ];

    // Play the respective audio file
    const playAudio = (audioFile) => {
        const audio = new Audio(audioFile);
        audio.play();
    };

    // Navigate to the Practice page when Practice button is clicked
    const handlePracticeClick = () => {
        navigate('/practice');
    };

    return (
        <div className="basic-japanese">
            <button className="practice-button" onClick={handlePracticeClick}>Practice</button>
            <h2>Learn Basic Japanese Hiragana and Pronunciation</h2>
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

export default BasicJapanese;
