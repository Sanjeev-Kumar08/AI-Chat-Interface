import React, { useState, useEffect, useRef } from 'react';
import { Trash2 } from 'lucide-react';
import ChatInput from './Components/ChatInput';
import MessageList from './Components/MessageList';
import { generateId } from './utils/generateId';
import { saveToStorage, loadFromStorage } from './utils/localStorageUtils';
import { PluginManager } from './utils/PluginManager';

// Main App Component
const App = () => {
  const [messages, setMessages] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    const savedMessages = loadFromStorage();
    console.log('savedMessages-->', savedMessages);
    setMessages(savedMessages);
  }, []);

  useEffect(() => {
    // Prevent overwriting storage on initial empty render
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    saveToStorage(messages);
  }, [messages]);

  const addMessage = (message) => {
    setMessages(prev => [...prev, message]);
  };

  const updateMessage = (id, updates) => {
    setMessages(prev => prev.map(msg =>
      msg.id === id ? { ...msg, ...updates } : msg
    ));
  };

  const handleSendMessage = async (input) => {
    const userMessage = {
      id: generateId(),
      sender: 'user',
      content: input,
      type: 'text',
      timestamp: new Date().toISOString()
    };

    addMessage(userMessage);

    // Check if this is a plugin command
    const pluginMatch = PluginManager.parseMessage(input);

    if (pluginMatch) {
      setIsProcessing(true);

      // Add pending assistant message
      const assistantMessage = {
        id: generateId(),
        sender: 'assistant',
        content: 'Processing...',
        type: 'plugin',
        pluginName: pluginMatch.plugin.name,
        status: 'pending',
        timestamp: new Date().toISOString()
      };

      addMessage(assistantMessage);

      // Execute plugin
      const result = await PluginManager.executePlugin(pluginMatch.plugin, input);

      if (result.success) {
        updateMessage(assistantMessage.id, {
          content: 'Plugin executed successfully',
          status: 'success',
          pluginData: result.data
        });
      } else {
        updateMessage(assistantMessage.id, {
          content: result.error,
          status: 'error'
        });
      }

      setIsProcessing(false);
    } else {
      // Handle as regular AI response
      const aiResponses = [
        "I understand you're trying to communicate with me. Try using one of my available commands like /weather, /calc, or /define!",
        "I'm a plugin-based AI assistant. I can help you with weather information, calculations, and word definitions using specific commands.",
        "For weather info, try '/weather [city]'. For calculations, use '/calc [expression]'. For definitions, use '/define [word]'.",
        "I'm designed to work with specific plugins. Type /weather, /calc, or /define followed by your query!"
      ];

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];

      setTimeout(() => {
        addMessage({
          id: generateId(),
          sender: 'assistant',
          content: randomResponse,
          type: 'text',
          timestamp: new Date().toISOString()
        });
      }, 500);
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <div className="max-w-full mx-auto h-screen flex flex-col shadow-lg px-2 shadow">
      {/* Header */}
      <div className="relative bg-blue-800 text-white p-4 text-center">
        <div>
          <h1 className="text-xl font-bold">AI Chat Interface</h1>
          <p className="text-md opacity-90">Plugin-powered assistant with weather, calculator, and dictionary tools</p>
        </div>

        {messages.length > 0 && (
          <button
            onClick={clearMessages}
            className="absolute top-5 right-2 bg-red-500 text-white text-sm flex items-center gap-1 hover:bg-red-600 cursor-pointer p-2 rounded-lg font-semibold"
          >
            <Trash2 size={20} />
            Clear Chat
          </button>
        )}
      </div>


      {/* Messages */}
      <MessageList messages={messages} />

      {/* Input */}
      <ChatInput onSendMessage={handleSendMessage} disabled={isProcessing} />
    </div>
  );
};

export default App;