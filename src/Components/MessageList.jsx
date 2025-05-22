import React, { useEffect, useRef } from 'react'
import { Bot} from 'lucide-react';
import MessageItem from './MessageItem';

const MessageList = ({ messages }) => {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                    <Bot size={48} className="mx-auto mb-4 text-gray-300" />
                    <p className="text-lg mb-2">Welcome to AI Chat!</p>
                    <p className="text-sm mb-4">Try these commands:</p>
                    <div className="bg-gray-50 p-4 rounded-lg text-left max-w-md mx-auto">
                        <div className="space-y-2 text-xs">
                            <div><strong>/weather [city]</strong> - Get weather information</div>
                            <div className="text-gray-600 ml-4">Try: New York, London, Tokyo, Paris, Sydney</div>
                            <div><strong>/calc [expression]</strong> - Calculate math expressions</div>
                            <div className="text-gray-600 ml-4">Try: 2+2, sqrt(16), sin(45), (5*3)+7</div>
                            <div><strong>/define [word]</strong> - Get word definitions</div>
                            <div className="text-gray-600 ml-4">Try: hello, computer, beautiful, wisdom</div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-200">
                            <div className="text-xs text-gray-500">
                                <div className="font-medium mb-1">Natural language also works:</div>
                                <div>• "What's the weather in Paris?"</div>
                                <div>• "Calculate 15 * 8"</div>
                                <div>• "Define serendipity"</div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                messages.map((message) => (
                    <MessageItem key={message.id} message={message}/>
                ))
            )}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default MessageList
