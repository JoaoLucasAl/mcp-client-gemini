import { useState, useEffect, useRef } from "react";
import ChatContainer from "./components/ChatContainer";
import ChatMessages from "./components/ChatMessages";
import InputArea from "./components/InputArea";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content:
        "Olá! 👋 Bem-vindo ao chat interativo. Como posso ajudá-lo hoje?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messageIdRef = useRef(2);

  const handleSendMessage = async (message) => {
    // Adicionar mensagem do usuário
    const userMessage = {
      id: messageIdRef.current++,
      content: message,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch("/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Adicionar resposta do bot
      const botMessage = {
        id: messageIdRef.current++,
        content: data.response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Erro:", error);

      // Adicionar mensagem de erro
      const errorMessage = {
        id: messageIdRef.current++,
        content: `❌ ${error.message || "Erro ao conectar com o servidor"}`,
        isUser: false,
        isError: true,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContainer>
      <ChatMessages messages={messages} isLoading={isLoading} />
      <InputArea onSendMessage={handleSendMessage} isLoading={isLoading} />
    </ChatContainer>
  );
}

export default App;
