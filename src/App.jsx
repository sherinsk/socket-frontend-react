// src/App.jsx
import React, { useEffect, useState } from 'react';
import { socket } from './socket';
import Modal from './modal';

function App() {
  const [message, setMessage] = useState('');
  const [incomingMessage, setIncomingMessage] = useState(null);

  const sendNotification = async () => {
    if (!message.trim()) return;

    await fetch('https://socket-backend-nest.onrender.com/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, senderSocketId: socket.id }),
    });

    setMessage('');
  };

  useEffect(() => {
    // Ask permission for browser notifications
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
    socket.on('receiveNotification', (data) => {
      setIncomingMessage(data.message);

       // Show browser notification if permission is granted
       if (Notification.permission === 'granted') {
        new Notification('New Notification', {
          body: data.message,
        });
      }
    });

    return () => {
      socket.off('receiveNotification');
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Send Notification</h1>
      <div className="flex gap-4">
        <input
          type="text"
          className="p-2 border rounded w-64"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={sendNotification}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>

      {incomingMessage && (
        <Modal message={incomingMessage} onClose={() => setIncomingMessage(null)} />
      )}
    </div>
  );
}

export default App;
