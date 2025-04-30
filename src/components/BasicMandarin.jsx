import React from 'react';
import './BasicMandarin.css';
import { useNavigate } from 'react-router-dom';

const BasicMandarin = () => {
    const navigate = useNavigate();

    const letters = [
        { letter: '一', pronunciation: 'Yī', audioFile: '/audio/1.mp3' },
        { letter: '二', pronunciation: 'Èr', audioFile: '/audio/2.mp3' },
        { letter: '三', pronunciation: 'Sān', audioFile: '/audio/4.mp3' },
        { letter: '四', pronunciation: 'Sì', audioFile: '/audio/3.mp3' },
        { letter: '五', pronunciation: 'Wǔ', audioFile: '/audio/5.mp3' },
        { letter: '六', pronunciation: 'Liù', audioFile: '/audio/6.mp3' },
        { letter: '七', pronunciation: 'Qī', audioFile: '/audio/7.mp3' },
        { letter: '八', pronunciation: 'Bā', audioFile: '/audio/8.mp3' },
        { letter: '九', pronunciation: 'Jiǔ', audioFile: '/audio/9.mp3' },
        { letter: '十', pronunciation: 'Shí', audioFile: '/audio/10.mp3' },
        { letter: '口', pronunciation: 'Kǒu', audioFile: '/audio/11.mp3' },
        { letter: '人', pronunciation: 'Rén', audioFile: '/audio/12.mp3' },
        { letter: '大', pronunciation: 'Dà', audioFile: '/audio/13.mp3' },
        { letter: '小', pronunciation: 'Xiǎo', audioFile: '/audio/14.mp3' },
        { letter: '中', pronunciation: 'Zhōng', audioFile: '/audio/15.mp3' },


        // Add more Mandarin characters and their audio file paths
    ];

    const playAudio = (audioFile) => {
        const audio = new Audio(audioFile);
        audio.play();
    };

    const handlePracticeClick = () => {
        navigate('/mandarinpractice');
    };

    return (
        <div className="basic-mandarin">
            <button className="practice-button" onClick={handlePracticeClick}>Practice</button>
            <h2>Learn Basic Mandarin Characters and Pronunciation</h2>
            <div className="letter-container">
                {letters.map((item, index) => (
                    <div key={index} className="letter-card">
                        <span className="letter">{item.letter}</span>
                        <span className="pronunciation">{item.pronunciation}</span>
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

export default BasicMandarin;
