import { genAI } from "../gemini/chatManager";
import { ToolWithClient } from "../mcp/types";
import { Chat } from "@google/genai";

let toolsHistory =
  "Segue um histórico das ferramentas que você já usou e a resposta delas. Se for solicitado utilize essas informações para responder o usuário, caso contrário responda naturalmente!\n\n";

export async function processMessage(
  userMessage: string,
  toolsWithClients: ToolWithClient[],
  chat: Chat
): Promise<string> {
  const prompt = userMessage;

  const result = await chat.sendMessage({
    message: toolsHistory + "Mensagem do usuário: " + prompt,
  });

  if (result.functionCalls && result.functionCalls.length > 0) {
    const functionCall = result.functionCalls[0];
    console.log(`🔧 Gemini solicitou uso da ferramenta: ${functionCall.name}`);

    const tool = toolsWithClients.find((t) => t.name === functionCall.name);
    if (!tool) {
      throw new Error(`❌ Ferramenta ${functionCall.name} não encontrada`);
    }

    const toolResult = await tool.client.callTool({
      name: functionCall.name!,
      arguments: functionCall.args,
    });

    const toolOutput =
      typeof toolResult.content === "object"
        ? JSON.stringify(toolResult.content, null, 2)
        : String(toolResult.content);

    toolsHistory +=
      "Entrada: " +
      JSON.stringify(functionCall) +
      "\nResposta: " +
      toolOutput +
      "\n---\n\n";

    const chatHistory = chat.getHistory();
    const output = await genAI.models.generateContent({
      model: "gemini-3.1-flash-lite",
      contents: [
        ...chatHistory,
        {
          role: "user",
          parts: [
            {
              text: `Ferramenta ${
                functionCall.name
              } foi executada com os seguintes parâmetros ${JSON.stringify(
                functionCall.args
              )} e gerou o seguinte resultado: ${toolOutput}
              
              Com base nesse resultado, forneça uma resposta natural para o usuário.`,
            },
          ],
        },
      ],
    });

    return output.text!;
  } else {
    return result.text!;
  }
}
