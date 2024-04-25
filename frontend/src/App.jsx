import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("/");

export default function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("message", receiveMessage);

    return () => {
      socket.off("message", receiveMessage);
    };
  }, []);

  const receiveMessage = (message) =>
    setMessages((state) => [message, ...state]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newMessage = {
      body: message,
      from: "Me",
    };
    setMessages((state) => [newMessage, ...state]);
    setMessage("");
    socket.emit("message", newMessage.body);
  };

  return (
    <div className="h-screen bg-gradient-to-r from-blue-400 to-orange-500 via-purple-500 animate-gradient-x text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Chat React</h1>
        <input
          name="message"
          type="text"
          placeholder="Write your message..."
          onChange={(e) => setMessage(e.target.value)}
          className="border-2 border-gray-500 p-2 w-full text-black rounded-md"
          value={message}
          autoFocus
        />
        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Send
        </button>
        <ul className="mt-6 h-80 overflow-y-auto">
          {messages.map((message, index) => (
            <li
              key={index}
              className={`my-2 p-2 table text-sm rounded-md ${message.from === "Me" ? "bg-blue-600 ml-auto" : "bg-gray-700"
                }`}
            >
              <b>{message.from}</b>: {message.body}
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}
