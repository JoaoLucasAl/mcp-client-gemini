import fs from "fs/promises";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { ToolWithClient } from "./types";
import { CONFIG_PATH } from "../config/env";

export async function connectToMCPServers(): Promise<ToolWithClient[]> {
  const configFile = await fs.readFile(CONFIG_PATH, "utf-8");
  const config = JSON.parse(configFile);

  const toolsWithClients: ToolWithClient[] = [];

  const toolPromises = Object.keys(config.mcpServers).map(async (key) => {
    const serverConfig = config.mcpServers[key];

    if (!serverConfig) {
      throw new Error(`❌ Servidor "${key}" não encontrado em ${CONFIG_PATH}`);
    }

    const transport = new StdioClientTransport({
      command: serverConfig.command,
      args: serverConfig.args,
      env: serverConfig.env,
    });

    const client = new Client({ name: `${key}`, version: "1.0.0" });
    client.connect(transport);

    const toolResult = await client.listTools();

    const toolArray = toolResult.tools.map((tool) => ({
      name: tool.name,
      description: tool.description || "",
      inputSchema: tool.inputSchema,
      client: client,
    })) as ToolWithClient[];

    toolsWithClients.push(...toolArray);
  });

  await Promise.all(toolPromises);

  return toolsWithClients;
}
