import { useRef } from "react";
import "./InputArea.css";

function InputArea({ onSendMessage, isLoading }) {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = inputRef.current?.value.trim();

    if (message && !isLoading) {
      onSendMessage(message);
      inputRef.current.value = "";
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="input-area" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <input
          ref={inputRef}
          type="text"
          placeholder="Digite sua mensagem..."
          disabled={isLoading}
          onKeyPress={handleKeyPress}
          autoComplete="off"
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}

export default InputArea;
