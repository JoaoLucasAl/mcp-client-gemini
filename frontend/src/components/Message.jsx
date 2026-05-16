import "./Message.css";

function Message({ message }) {
  return (
    <div className={`message ${message.isUser ? "user" : "bot"}`}>
      <div
        className={`message-content ${message.isError ? "error-message" : ""}`}
      >
        {message.content}
      </div>
    </div>
  );
}

export default Message;
