import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdvancedFrench.css'; // Add your CSS for styling

const AdvancedFrench = () => {
    const navigate = useNavigate();

    const handleScenarioSelection = (scenario) => {
        if (scenario === 'orderingFood') {
            navigate('/french/ordering-food'); // Navigate to the ordering food page
        } else if (scenario === 'casualConversation') {
            navigate('/french/casual-conversation'); // Navigate to casual conversation page
        } else if (scenario === 'flightBooking') {
            navigate('/french/flight-booking'); // Navigate to flight booking page
        }
    };

    return (
        <div className="advanced-french-container">
            <header className="advanced-french-header">
                <h1>Scénarios en Français Avancés</h1> {/* Advanced French Scenarios */}
                <p>Choisissez un scénario pour pratiquer le français dans des situations de la vie réelle.</p>
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

            <footer className="advanced-french-footer">
                <p>&copy; 2024 LinguaLearn</p>
            </footer>
        </div>
    );
};

export default AdvancedFrench;
