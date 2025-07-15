import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// ✅ Connect frontend (port 3000) to backend server (port 5000)
const socket = io('http://localhost:5000');

function App() {
  // 🧠 message = current input, messages = chat history
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // ✅ Receive messages from backend
  useEffect(() => {
    // Function to handle incoming message
    const handleMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    // 🟢 Register event listener ONCE
    socket.on('receiveMessage', handleMessage);

    // 🔴 Cleanup function to remove duplicate listener on re-renders/unmount
    return () => {
      socket.off('receiveMessage', handleMessage);
    };
  }, []);

  // ✅ Send message to backend
  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('sendMessage', message); // 📤 Send message to backend
      setMessage(''); // Clear input box
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h2>💬 Real-Time Chat App</h2>

      {/* 📜 Message list */}
      <div
        style={{
          height: '250px',
          overflowY: 'auto',
          border: '1px solid #ccc',
          padding: '10px',
          marginBottom: '15px',
          borderRadius: '6px',
          backgroundColor: '#f9f9f9'
        }}
      >
        {messages.map((msg, index) => (
          <p key={index} style={{ margin: '5px 0' }}>
            {msg}
          </p>
        ))}
      </div>

      {/* ✏️ Input + 🔘 Send Button */}
      <input
        type="text"
        value={message}
        placeholder="Type a message..."
        onChange={(e) => setMessage(e.target.value)}
        style={{
          width: '70%',
          padding: '10px',
          marginRight: '10px',
          border: '1px solid #bbb',
          borderRadius: '4px'
        }}
      />
      <button
        onClick={sendMessage}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Send
      </button>
    </div>
  );
}

export default App;
