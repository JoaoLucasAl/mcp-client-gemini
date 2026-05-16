import "./LoadingIndicator.css";

function LoadingIndicator() {
  return (
    <div className="message bot loading">
      <div className="message-content">
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
}

export default LoadingIndicator;
