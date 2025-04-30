import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import German from './components/GermanLearning';
import Spanish from './components/Spanish';
import French from './components/French';
import Japanese from './components/Japanese';
import Mandarin from './components/Mandarin';
import ScenarioPage from './components/ScenarioPage';
import GermanLearning from './components/GermanLearning';
import GermanRolePlay from './components/GermanRolePlay';
import SpanishLearning from './components/SpanishLearning';
import BasicGerman from './components/BasicGerman';
import PracticePage from './components/PracticePage';
import BasicSpanish from './components/BasicSpanish';
import PracticePage2 from './components/PracticePage2';
import BasicFrench from './components/BasicFrench';
import BasicMandarin from './components/BasicMandarin';
import IntermediateGerman from './components/IntermediateGerman';
import IntermediateSpanish from './components/IntermediateSpanish';
import IntermediateFrench from './components/IntermediateFrench';
import IntermediateMandarin from './components/IntermediateMandarin';
import BasicJapanese from './components/BasicJapanese';
import IntermediateJapanese from './components/IntermediateJapanese';
import Hindi from './components/Hindi';
import BasicHindi from './components/BasicHindi';
import HindiPractice from './components/HindiPractice';
import IntermediateHindi from './components/IntermediateHindi';
import MandarinPractice from './components/MandarinPractice';
import GermanPrac from './components/GermanPrac';
import GermanRolePlay2 from './components/GermanRolePlay2';
import GermanRolePlay3 from './components/GermanRolePlay3';
import AdvancedMandarin from './components/AdvancedMandarin';
import OrderingFood from './components/OrderingFood';
import CasualConversation from './components/CasualConversation';
import FlightBooking from './components/FlightBooking';
import MandarinPrac from './components/MandarinPrac';

import HindiPrac from './components/HindiPrac';
import AdvancedHindi from './components/AdvancedHindi';
import OrderingFood2 from './components/OrderingFood2';
import CasualConversation2 from './components/CasualConversation2';
import FlightBooking2 from './components/FlightBooking2';
import SpanishPrac from './components/SpanishPrac';
import AdvancedSpanish from './components/AdvancedSpanish';
import OrderingFood3 from './components/OrderingFood3';
import CasualConversation3 from './components/CasualConversation3';
import FlightBooking3 from './components/FlightBooking3';
import AdvancedFrench from './components/AdvancedFrench';
import OrderingFood4 from './components/OrderingFood4';
import CasualConversation4 from './components/CasualConversation4';
import FlightBooking4 from './components/FlightBooking4';
import FrenchPrac from './components/FrenchPrac';
import AdvancedJapanese from './components/AdvancedJapanese';
import OrderingFood5 from './components/OrderingFood5';
import CasualConversation5 from './components/CasualConversation5';
import FlightBooking5 from './components/FlightBooking5';
import Chatbot from './components/Chatbot';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Signup />} /> {/* Default to Signup */}
                <Route path="/login" element={<Login />} /> {/* Login page */}
                <Route path="/home" element={<Home />} /> {/* Home page */}
                <Route path="/german" element={<German />} /> {/* German language page */}
                <Route path="/spanish" element={<Spanish />} />
                <Route path="/French" element={<French />} />
                <Route path="/Japanese" element={<Japanese />} />
                <Route path="/Mandarin" element={<Mandarin />} />
                <Route path="/german-learning" element={<GermanLearning />} />
                <Route path="/scenario" element={<ScenarioPage />} />
                <Route path="/scenario/ordering-food" element={<GermanRolePlay />} /> {/* Route to GermanRolePlay */}
                <Route path="/spanish-learning" element={<SpanishLearning />} />
                <Route path="/german/basic" element={<BasicGerman />} />
                <Route path="/practice" element={<PracticePage />} />
                <Route path="/spanish/basic" element={<BasicSpanish />} />
                <Route path="/practice2" element={<PracticePage2 />} />
                <Route path="/french/basic" element={<BasicFrench />} />
                <Route path="/mandarin/basic" element={<BasicMandarin />} />
                <Route path="/german/intermediate" element={<IntermediateGerman />} />
                <Route path="/spanish/intermediate" element={<IntermediateSpanish />} />
                <Route path="/french/intermediate" element={<IntermediateFrench />} />
                <Route path="/mandarin/intermediate" element={<IntermediateMandarin />} />
                <Route path="/japanese/basic" element={<BasicJapanese />} />
                <Route path="/japanese/intermediate" element={<IntermediateJapanese />} />
                <Route path="/Hindi" element={<Hindi />} />
                <Route path="/hindi/basic" element={<BasicHindi />} />
                <Route path="/hindipractice" element={<HindiPractice />} />
                <Route path="/hindi/intermediate" element={<IntermediateHindi />} />
                <Route path="/mandarinpractice" element={<MandarinPractice />} />
                <Route path="/germanprac" element={<GermanPrac />} />
                <Route path="/scenario/casual-conversation" element={<GermanRolePlay2 />} /> 
                <Route path="/scenario/flight-booking" element={<GermanRolePlay3 />} /> 
                <Route path="/mandarin/advanced" element={<AdvancedMandarin />} />
                <Route path="/mandarin/ordering-food" element={<OrderingFood />} />
                <Route path="/mandarin/casual-conversation" element={<CasualConversation />} />
                <Route path="/mandarin/flight-booking" element={<FlightBooking />} />
                <Route path="/mandarinprac" element={<MandarinPrac />} />
                <Route path="/chatbot" element={<Chatbot />} /> {/* Login page */}
                <Route path="/hindiprac" element={<HindiPrac />} />
                <Route path="/hindi/advanced" element={<AdvancedHindi />} />
                <Route path="/hindi/ordering-food" element={<OrderingFood2 />} />
                <Route path="/hindi/casual-conversation" element={<CasualConversation2 />} />
                <Route path="/hindi/flight-booking" element={<FlightBooking2 />} />
                <Route path="/spanishprac" element={<SpanishPrac />} />
                <Route path="/spanish/advanced" element={<AdvancedSpanish />} />
                <Route path="/spanish/ordering-food" element={<OrderingFood3 />} />
                <Route path="/spanish/casual-conversation" element={<CasualConversation3 />} />
                <Route path="/spanish/flight-booking" element={<FlightBooking3 />} />
                <Route path="/french/advanced" element={<AdvancedFrench />} />
                <Route path="/french/ordering-food" element={<OrderingFood4 />} />
                <Route path="/french/casual-conversation" element={<CasualConversation4 />} />
                <Route path="/french/flight-booking" element={<FlightBooking4 />} />
                <Route path="/frenchprac" element={<FrenchPrac />} />
                <Route path="/japanese/advanced" element={<AdvancedJapanese />} />
                <Route path="/japanese/ordering-food" element={<OrderingFood5 />} />
                <Route path="/japanese/casual-conversation" element={<CasualConversation5 />} />
                <Route path="/japanese/flight-booking" element={<FlightBooking5 />} />
                
            </Routes>
        </Router>
    );
}

export default App;


