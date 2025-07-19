'use client';

import React, { useState, useRef, useEffect } from 'react';
import { SendHorizonal } from 'lucide-react';

const ChatComponent = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const handleSendChatMessage = async () => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', content: message }]);
    setMessage('');

    const res = await fetch(`http://localhost:8000/chat?message=${message}`);
    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      {
        role: 'assistant',
        content: data?.message,
        documents: data?.docs,
      },
    ]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 my-2 rounded-md max-w-[90%] ${
              msg.role === 'user' ? 'bg-blue-100 self-end' : 'bg-gray-100 self-start'
            }`}
          >
            <pre className="whitespace-pre-wrap break-words text-sm">{JSON.stringify(msg, null, 2)}</pre>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-3 bg-white flex gap-2 items-center">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendChatMessage}
          disabled={!message.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-1 disabled:opacity-50"
        >
          <SendHorizonal size={18} />
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
