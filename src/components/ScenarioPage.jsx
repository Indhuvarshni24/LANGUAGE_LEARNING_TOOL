import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ScenarioPage.css';

const ScenarioPage = () => {
    const navigate = useNavigate();

    const scenarios = ['Ordering Food', 'Casual Conversation', 'Flight Booking'];

    const handleScenarioSelect = (scenario) => {
        if (scenario === 'Ordering Food') {
            navigate('/scenario/ordering-food'); // Navigate to RolePlay page for Ordering Food
        }
        if (scenario === 'Casual Conversation') {
            navigate('/scenario/casual-conversation'); // Navigate to RolePlay page for Ordering Food
        }
        if (scenario === 'Flight Booking') {
            navigate('/scenario/flight-booking'); // Navigate to RolePlay page for Ordering Food
        }
        // Handle other scenarios similarly
    };

    return (
        <div className="scenario-page-container">
            <h2>Select a Scenario</h2>
            <div className="scenario-buttons">
                {scenarios.map((scenario) => (
                    <button
                        key={scenario}
                        onClick={() => handleScenarioSelect(scenario)}
                        className="scenario-button"
                    >
                        {scenario}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ScenarioPage;
