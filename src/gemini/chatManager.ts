import { GoogleGenAI, Chat } from "@google/genai";
import { GEMINI_API_KEY } from "../config/env";
import { ToolMeta } from "../mcp/types";
import { jsonSchemaToFunctionDeclaration } from "../utils/index";

const genAI = new GoogleGenAI({
  apiKey: GEMINI_API_KEY,
});

export function createChat(tools: ToolMeta[]): Chat {
  return genAI.chats.create({
    model: "gemini-2.0-flash",
    config: {
      tools: [
        {
          functionDeclarations: tools.map(jsonSchemaToFunctionDeclaration),
        },
      ],
    },
  });
}

export { genAI };
