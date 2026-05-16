import express from "express";
import cors from "cors";
import path from "path";
import { PORT } from "./config/env";
import { connectToMCPServers } from "./mcp/clientManager";
import { createChat } from "./gemini/chatManager";
import { processMessage } from "./handlers/chatHandler";
import { Chat } from "@google/genai";
import { ToolWithClient } from "./mcp/types";

const app = express();
app.use(cors());
app.use(express.json());

let toolsWithClients: ToolWithClient[] = [];
let chat: Chat;

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const reply = await processMessage(message, toolsWithClients, chat);
    console.log(reply);
    res.json({ response: reply });
  } catch (error) {
    console.error("❌ Erro ao processar mensagem:", error);
    res.status(500).json({ error: "Erro interno ao processar a mensagem" });
  }
});

app.listen(PORT, async () => {
  try {
    toolsWithClients = await connectToMCPServers();
    const tools = toolsWithClients.map(
      ({ name, description, inputSchema }) => ({
        name,
        description,
        inputSchema,
      })
    );
    chat = createChat(tools);

    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  } catch (err) {
    console.error("❌ Erro ao iniciar:", err);
  }
});
