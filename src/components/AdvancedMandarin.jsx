import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdvancedMandarin.css'; // Add your CSS for styling

const AdvancedMandarin = () => {
    const navigate = useNavigate();

    const handleScenarioSelection = (scenario) => {
        if (scenario === 'orderingFood') {
            navigate('/mandarin/ordering-food'); // Navigate to the ordering food page
        } else if (scenario === 'casualConversation') {
            navigate('/mandarin/casual-conversation'); // Navigate to casual conversation page
        } else if (scenario === 'flightBooking') {
            navigate('/mandarin/flight-booking'); // Navigate to flight booking page
        }
    };

    return (
        <div className="advanced-mandarin-container">
            <header className="advanced-mandarin-header">
                <h1>Advanced Mandarin Scenarios</h1>
                <p>Select a scenario to begin practicing Mandarin in real-life situations.</p>
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

            <footer className="advanced-mandarin-footer">
                <p>&copy; 2024 LinguaLearn</p>
            </footer>
        </div>
    );
};

export default AdvancedMandarin;
