import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// ⚠️ Branding / warning in console
console.warn("© 2025 Ginkala Dhanush – For demo/learning only.");

// ✅ Connect to live backend hosted on Render (with proper options)
const socket = io("https://chat-app-backend-dxyi.onrender.com", {
  transports: ["websocket"],
  withCredentials: true,
});

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // 🟢 Show in console when connected
    socket.on("connect", () => {
      console.log("✅ Connected to backend!");
    });

    // 📥 Listen for incoming messages
    const handleMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on('receiveMessage', handleMessage);

    // 🔴 Cleanup on unmount to avoid duplicate listeners
    return () => {
      socket.off('receiveMessage', handleMessage);
      socket.disconnect();
    };
  }, []);

  // 📤 Send message to backend
  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('sendMessage', message);
      setMessage('');
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h2>💬 Real-Time Chat App</h2>

      {/* 🗒️ Message list */}
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

      {/* ✏️ Input + Send button */}
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

      {/* 🔻 Branding footer */}
      <footer style={{ fontSize: '10px', textAlign: 'center', marginTop: '20px', opacity: 0.6 }}>
        © 2025 Ginkala Dhanush – For demo/learning only.
      </footer>
    </div>
  );
}

export default App;
