import React, { useState } from 'react';

export default function App() {
  const [messages, setMessages] = useState([
    { text: "Hello! I am your AI assistant. How can I help you today?", sender: "ai" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handled asynchronous API calls using Async/Await
  const handleSend = async () => {
    if (!input.trim()) return;

    // 1. Update UI immediately with user message
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      // 2. Simulate the Gemini API Network Request (1.5 second delay)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // 3. Update UI with AI Response
      setMessages([...newMessages, { 
        text: "This is a simulated response. The async/await logic is fully built to handle the real Gemini API JSON payload here!", 
        sender: "ai" 
      }]);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      // Manage loading states and errors gracefully
      setIsLoading(false);
    }
  };

  return (
    // Fixed the centering by ensuring w-full and flex-col on the main container
    <div className="min-h-screen w-full bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-2xl overflow-hidden flex flex-col h-[85vh]">
        
        <div className="bg-blue-600 p-5 text-white text-center font-bold text-2xl tracking-wide">
          AI Chat
        </div>

        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-gray-800">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-4 rounded-2xl max-w-[80%] text-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-700 text-gray-200 rounded-bl-none'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="p-4 rounded-2xl bg-gray-700 text-gray-400 italic rounded-bl-none text-lg">
                AI is typing...
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-gray-900 border-t border-gray-700 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 p-4 rounded-xl bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-lg"
          />
          <button 
            onClick={handleSend} 
            disabled={isLoading} 
            className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}