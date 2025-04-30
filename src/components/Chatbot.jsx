// src/components/Chatbot.js
import React, { useState } from "react";

const Chatbot = () => {
  const [query, setQuery] = useState("");
  const [responses, setResponses] = useState([]);

  // Handle input query change
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle query submit
  const handleQuerySubmit = async (e) => {
    e.preventDefault();

    // Fetch the response based on user query
    const response = await fetchResponse(query);

    // Update the responses state with the new query and response
    setResponses([
      ...responses,
      { query, response }
    ]);
    setQuery("");
  };

  // Function to fetch the response based on the query
  const fetchResponse = (query) => {
    // Lowercase the query for case-insensitive matching
    const queryLower = query.toLowerCase();

    // Predefined responses for specific queries
    const mockResponses = {
      "hello in mandarin": "In Mandarin, 'hello' is 你好 (nǐ hǎo).",
      "tell about basic grammar": "Basic grammar includes sentence structure, tenses, parts of speech like nouns, verbs, and adjectives.",
      "hello": "Hi there! How can I help you today?",
      "what is your name?": "I'm your language learning assistant.",
      "bye": "Goodbye! Have a great day!",
      "how are you?": "I'm just a bot, but thanks for asking! How can I help?",
      "what is a noun?": "A noun is a word that names a person, place, thing, or idea.",
      "what is a verb?": "A verb is a word that represents an action, occurrence, or state of being.",
      "how to say thank you in french?": "In French, 'thank you' is 'merci'.",
      "how to say goodbye in spanish?": "In Spanish, 'goodbye' is 'adiós'.",
      "how to say good morning in german?": "In German, 'good morning' is 'Guten Morgen'.",
      "how to say please in japanese?": "In Japanese, 'please' can be said as 'お願いします' (onegaishimasu).",
      "what is an adjective?": "An adjective is a word that describes a noun or pronoun, giving more information about it.",
      "what is a pronoun?": "A pronoun is a word that takes the place of a noun, such as 'he', 'she', 'it', 'they', etc.",
      "who invented the internet?": "The Internet was developed by many contributors, but ARPANET is credited as the first network, created by DARPA in the 1960s.",
      "what is artificial intelligence?": "Artificial Intelligence (AI) is a field of computer science that focuses on creating machines that can perform tasks requiring human intelligence.",
      "how does machine learning work?": "Machine learning uses data and algorithms to allow computers to learn and make decisions without being explicitly programmed.",
    };

    // Return the corresponding response or a fallback message
    return mockResponses[queryLower] || "Sorry, I don't understand that.";
  };

  return (
    <div>
      <h2>Chatbot</h2>
      <div>
        {/* Display the conversation */}
        {responses.map((res, index) => (
          <div key={index}>
            <p><strong>You:</strong> {res.query}</p>
            <p><strong>Bot:</strong> {res.response}</p>
          </div>
        ))}
      </div>
      {/* Input form for sending queries */}
      <form onSubmit={handleQuerySubmit}>
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Ask a question"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
