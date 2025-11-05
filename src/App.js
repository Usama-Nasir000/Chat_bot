import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";



function App() {
  const base_url="127.0.0.1:8000"
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMsg = { sender: "user", text: message };
    setChat([...chat, userMsg]);
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/chat?message=" + message);
      const aiMsg = { sender: "ai", text: res.data.ai_response };
      setChat((prev) => [...prev, aiMsg]);
    } catch (err) {
      setChat((prev) => [...prev, { sender: "ai", text: "Error connecting to server!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box shadow-lg rounded">
        <h3 className="text-center mb-3 mt-2">ALFRED-X</h3>

        <div className="messages-area">
          {chat.map((msg, i) => (
            <div
              key={i}
              className={`message ${msg.sender === "user" ? "user-msg" : "ai-msg"}`}
            >
              {msg.text}
            </div>
          ))}
          {loading && <div className="ai-msg">Typing...</div>}
        </div>

        <form onSubmit={sendMessage} className="input-area">
          <input
            type="text"
            className="form-control"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
