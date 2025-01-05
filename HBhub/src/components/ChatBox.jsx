import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../ChatBox.css";

const ChatBox = ({ groups }) => {
  const { groupName } = useParams(); // Get the group name from URL params
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  // Retrieve the user's name from localStorage
  const userName = localStorage.getItem("userName");  // Get the userName from localStorage

  // Load the group's chat messages from localStorage
  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem(groupName)) || [];
    setMessages(storedMessages);
  }, [groupName]);

  // Handle message sending
  const handleSendMessage = () => {
    if (message.trim() || file) {
      // Create a new message object
      const newMessage = {
        sender: userName, // Use the username from localStorage
        text: message.trim(),
        file: file ? URL.createObjectURL(file) : null,
        timestamp: new Date().toISOString(),
      };

      // Store the new message in localStorage
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      localStorage.setItem(groupName, JSON.stringify(updatedMessages));

      // Clear input fields
      setMessage("");
      setFile(null);
    } else {
      alert("Please enter a message or upload a valid file.");
    }
  };

  // Handle file input
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div className="chatbox-container">
      <header className="chatbox-header">
        <h2>{`Group Chat: ${groupName}`}</h2>
      </header>

      <div className="messages-container">
        {messages.length > 0 ? (
          messages.map((msg, index) => (
            <div key={index} className="message">
              <div className="message-content">
                {/* Display sender's username with the message */}
                <strong>{msg.sender}</strong>: <span>{msg.text}</span>
              </div>
              {msg.file && (
                <div className="file-message">
                  <a href={msg.file} target="_blank" rel="noopener noreferrer">
                    {msg.file.includes("image") ? (
                      <img src={msg.file} alt="uploaded" className="file-img" />
                    ) : (
                      <span>Click to view file</span>
                    )}
                  </a>
                </div>
              )}
              <div className="message-timestamp">
                <small>{new Date(msg.timestamp).toLocaleString()}</small>
              </div>
            </div>
          ))
        ) : (
          <p>No messages yet. Be the first to send a message!</p>
        )}
      </div>

      <div className="message-input-container">
        <textarea
          className="message-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
        />
        <input
          className="file-input"
          type="file"
          accept="image/*, .pdf, .docx, .txt"
          onChange={handleFileChange}
        />
        <button className="send-button" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
