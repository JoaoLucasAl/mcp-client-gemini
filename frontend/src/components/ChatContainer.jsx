import "./ChatContainer.css";

function ChatContainer({ children }) {
  return (
    <div className="container">
      <div className="header">
        <h1>💬 Chat Interativo</h1>
        <p>Powered by Google Gemini + MCP</p>
      </div>

      {children}
    </div>
  );
}

export default ChatContainer;
