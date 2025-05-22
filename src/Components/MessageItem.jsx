import React from 'react'
import { Bot, User, Loader, AlertCircle, Trash2 } from 'lucide-react';
import { PluginManager } from '../utils/PluginManager';

const MessageItem = ({ message }) => {
  const isUser = message.sender === 'user';

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex gap-3 group ${isUser ? 'flex-row-reverse' : ''} mb-4`}>
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isUser ? 'bg-blue-600' : 'bg-gray-500'
        }`}>
        {isUser ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
      </div>

      <div className={`relative flex-1 max-w-md ${isUser ? 'text-right' : ''}`}>
        <div className={`inline-block p-3 rounded-lg text-sm group ${isUser
          ? 'bg-blue-600 text-white rounded-br-sm'
          : 'bg-gray-100 text-gray-800 rounded-bl-sm'
          }`}>
          <div>

          </div>
          {message.type === 'plugin' && message.pluginData ? (
            <div>
              {message.status === 'pending' && (
                <div className="flex items-center gap-2">
                  <Loader className="animate-spin" size={16} />
                  <span>Processing...</span>
                </div>
              )}
              {message.status === 'error' && (
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle size={16} />
                  <span>{message.content}</span>
                </div>
              )}
              {message.status === 'success' && message.pluginData && (
                <div>
                  {(() => {
                    const plugin = PluginManager.plugins.find(p => p.name === message.pluginName);
                    return plugin ? plugin.render(message.pluginData) : null;
                  })()}
                </div>
              )}
            </div>
          ) : (
            <span>{message.content}</span>
          )}
        </div>
        <div className="text-xs text-gray-400 mt-1">
          {formatTimestamp(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default MessageItem
