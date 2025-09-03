
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiX } from 'react-icons/fi';

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            className="fixed bottom-24 right-6 z-50 w-80 h-96 bg-[#1e1e1e] rounded-lg shadow-2xl flex flex-col border border-gray-700"
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <div className="p-4 bg-gray-800 text-white font-bold rounded-t-lg">
              AI Assistant
            </div>
            <div className="flex-grow p-4 text-gray-300 text-sm">
              <p>Hello! How can I help you today?</p>
              {/* Chat messages would go here */}
            </div>
            <div className="p-2 border-t border-gray-700">
              <input 
                type="text" 
                placeholder="Type a message..."
                className="w-full bg-gray-800 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;
