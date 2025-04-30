import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdvancedHindi.css'; // Add your CSS for styling

const AdvancedHindi = () => {
    const navigate = useNavigate();

    const handleScenarioSelection = (scenario) => {
        if (scenario === 'orderingFood') {
            navigate('/hindi/ordering-food'); // Navigate to the ordering food page
        } else if (scenario === 'casualConversation') {
            navigate('/hindi/casual-conversation'); // Navigate to casual conversation page
        } else if (scenario === 'flightBooking') {
            navigate('/hindi/flight-booking'); // Navigate to flight booking page
        }
    };

    return (
        <div className="advanced-hindi-container">
            <header className="advanced-hindi-header">
                <h1>एडवांस्ड हिंदी परिदृश्य</h1> {/* Change from Mandarin to Hindi */}
                <p>वास्तविक जीवन स्थितियों में हिंदी का अभ्यास करने के लिए एक परिदृश्य चुनें।</p>
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

            <footer className="advanced-hindi-footer">
                <p>&copy; 2024 लिंगुआलर्न</p>
            </footer>
        </div>
    );
};

export default AdvancedHindi;
