// App.js
import React, { useEffect, useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // Example client-side connection
    const userId = "u123";

    const clientId = "c456";





    

    const socket = new WebSocket(
      `ws://localhost:4000?userId=${userId}&clientId=${clientId}&targetDomain=ws://localhost:4001`
    );

    socket.onopen = () => {
      console.log("✅ Connected to X-server (proxy)");
      setMessages((prev) => [...prev, "Connected to server"]);
    };

    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    socket.onclose = () => {
      setMessages((prev) => [...prev, "❌ Connection closed"]);
    };

    setWs(socket);
    return () => socket.close();
  }, []);

  const sendMessage = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(input);
      setInput("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>WebSocket Ping/Pong Demo</h2>
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <ul>
        {messages.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    </div>
  );
}
export default App;
