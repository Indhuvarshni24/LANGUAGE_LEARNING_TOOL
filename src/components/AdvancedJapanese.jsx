import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdvancedJapanese.css'; // Add your CSS for styling

const AdvancedJapanese = () => {
    const navigate = useNavigate();

    const handleScenarioSelection = (scenario) => {
        if (scenario === 'orderingFood') {
            navigate('/japanese/ordering-food'); // Navigate to the ordering food page
        } else if (scenario === 'casualConversation') {
            navigate('/japanese/casual-conversation'); // Navigate to casual conversation page
        } else if (scenario === 'flightBooking') {
            navigate('/japanese/flight-booking'); // Navigate to flight booking page
        }
    };

    return (
        <div className="advanced-japanese-container">
            <header className="advanced-japanese-header">
                <h1>アドバンスド日本語シナリオ</h1> {/* "Advanced Japanese Scenarios" */}
                <p>実生活のシチュエーションで日本語を練習するために、シナリオを選んでください。</p> {/* "Choose a scenario to practice Japanese in real-life situations." */}
            </header>

            <section className="scenario-selection">
                <button onClick={() => handleScenarioSelection('orderingFood')}>
                    Ordering Food
                </button>
                <button onClick={() => handleScenarioSelection('casualConversation')}>
                    Casual Conversation
                </button>
                <button onClick={() => handleScenarioSelection('flightBooking')}>
                    Flight Booking
                </button>
            </section>

            <footer className="advanced-japanese-footer">
                <p>&copy; 2024 リンガラーニ (LinguaLearn)</p> {/* LinguaLearn translation */}
            </footer>
        </div>
    );
};

export default AdvancedJapanese;
