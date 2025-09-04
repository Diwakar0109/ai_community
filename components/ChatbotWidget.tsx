import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiSend, FiX } from 'react-icons/fi';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { v4 as uuidv4 } from 'uuid';

// --- Installation (if you haven't already) ---
// npm install axios react-markdown uuid
// npm install -D @types/uuid 

// --- Types for managing chat state ---
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

// --- Helper component for the typing indicator ---
const TypingIndicator = () => (
  <motion.div
    className="flex items-center space-x-1.5 p-2"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <span className="text-gray-400">AI is typing</span>
    <motion.div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.8, repeat: Infinity }} />
    <motion.div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.8, delay: 0.2, repeat: Infinity }} />
    <motion.div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.8, delay: 0.4, repeat: Infinity }} />
  </motion.div>
);


const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  // --- State Management ---
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // --- BACKEND URL ---
  // The backend URL is now set to your deployed Render service.
  const backendUrl = "https://ai-community-chatbot.onrender.com";

  // --- Effects ---

  // Generate a unique session ID when the chat widget is first opened
  useEffect(() => {
    if (isOpen && !sessionId) {
      const newSessionId = uuidv4();
      console.log("New Session ID created:", newSessionId);
      setSessionId(newSessionId);
      // Set the initial greeting from the bot
      setMessages([{ id: 'initial-greeting', text: 'Hello! I am an AI assistant with a specific knowledge base. How can I help you today?', sender: 'bot' }]);
    }
  }, [isOpen, sessionId]);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);


  // --- API Communication ---
  const handleSendMessage = async () => {
    const userMessageText = inputValue.trim();
    if (!userMessageText || !sessionId || isLoading) return; // Prevent sending while loading or if empty

    const userMessage: Message = { id: uuidv4(), text: userMessageText, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Format chat history for the backend
      const chat_history = messages
        .filter(m => m.id !== 'initial-greeting')
        .map(m => (m.sender === 'user' ? [m.text, ''] : ['', m.text]))
        .reduce((acc: [string, string][], val) => {
          if (val[0]) acc.push([val[0], '']); 
          else if (acc.length > 0) acc[acc.length - 1][1] = val[1];
          return acc;
        }, []);
      
      const response = await axios.post(`${backendUrl}/chat`, {
        session_id: sessionId,
        question: userMessageText,
        chat_history: chat_history,
      });

      const botMessage: Message = { id: uuidv4(), text: response.data.answer, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error("Error communicating with the chatbot backend:", error);
      const errorMessage: Message = {
        id: uuidv4(),
        text: 'Sorry, I encountered an error. Please try again later.',
        sender: 'bot'
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      <motion.button
        className="fixed bottom-6 right-6 z-50 bg-cyan-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        initial={{ opacity: 0, scale: 0.5, x: 100 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 1, type: 'spring' }}
        whileHover={{ scale: 1.1 }}
      >
        <AnimatePresence>
          {isOpen ? <FiX size={30} /> : <FiMessageSquare size={30} />}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-full max-w-sm h-[60vh] max-h-[500px] bg-[#1e1e1e] rounded-lg shadow-2xl flex flex-col border border-gray-700"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            {/* Header */}
            <div className="p-4 bg-gray-800 text-white font-bold rounded-t-lg flex-shrink-0">
              AI Assistant
            </div>

            {/* Messages Area */}
            <div ref={chatContainerRef} className="flex-grow p-4 overflow-y-auto space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-3 py-2 text-sm ${
                      msg.sender === 'user' 
                        ? 'bg-cyan-600 text-white' 
                        : 'bg-gray-700 text-gray-200'
                    }`}
                  >
                    <ReactMarkdown className="prose prose-sm prose-invert">
                        {msg.text}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
              {isLoading && <TypingIndicator />}
            </div>

            {/* --- MODIFIED INPUT AREA WITH SEND BUTTON --- */}
            <div className="p-2 border-t border-gray-700 flex items-center space-x-2 flex-shrink-0">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full bg-gray-800 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-cyan-500 text-white p-2 rounded-full disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-cyan-600 transition-colors"
              >
                <FiSend size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;
