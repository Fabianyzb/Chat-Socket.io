import io from 'socket.io-client';
import React, { useState, useEffect } from 'react';

const socket = io("/");

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que el formulario refresque la página
    socket.emit("message", message);
  };

  useEffect(() => {
    socket.on('message', (receivedMessage) => {
      console.log(receivedMessage);
      setMessages([...messages, receivedMessage]);
    });

    return () => {
      // Limpieza al desmontar el componente (opcional)
    };
  }, [messages]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Write your message...'
          onChange={(e) => setMessage(e.target.value)} /* Actualiza el valor del input cuando se cambia el mensaje */
        />
        <button>Send</button>
      </form>

      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
