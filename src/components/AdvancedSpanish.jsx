import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdvancedSpanish.css'; // Add your CSS for styling

const AdvancedSpanish = () => {
    const navigate = useNavigate();

    const handleScenarioSelection = (scenario) => {
        if (scenario === 'orderingFood') {
            navigate('/spanish/ordering-food'); // Navigate to the ordering food page
        } else if (scenario === 'casualConversation') {
            navigate('/spanish/casual-conversation'); // Navigate to casual conversation page
        } else if (scenario === 'flightBooking') {
            navigate('/spanish/flight-booking'); // Navigate to flight booking page
        }
    };

    return (
        <div className="advanced-spanish-container">
            <header className="advanced-spanish-header">
                <h1>Escenarios Avanzados en Español</h1> {/* Spanish Header */}
                <p>Elija un escenario para practicar español en situaciones de la vida real.</p> {/* Spanish Text */}
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

            <footer className="advanced-spanish-footer">
                <p>&copy; 2024 LinguaLearn</p> {/* Footer text in Spanish */}
            </footer>
        </div>
    );
};

export default AdvancedSpanish;
