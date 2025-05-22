import React, { useState } from 'react'
import { Send } from 'lucide-react';

const ChatInput = ({ onSendMessage, disabled }) => {
    const [input, setInput] = useState('');
    
    const handleSubmit = () => {
      if (input.trim() && !disabled) {
        onSendMessage(input.trim());
        setInput('');
      }
    };
    
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    };
    
    return (
      <div className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message or use /weather, /calc, /define..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={disabled}
          />
          <button
            onClick={handleSubmit}
            disabled={!input.trim() || disabled}
            className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    );
  };

export default ChatInput;
