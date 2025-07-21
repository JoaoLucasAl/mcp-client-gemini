import { Client } from "@modelcontextprotocol/sdk/client/index.js";

export type ToolMeta = {
  name: string;
  description: string;
  inputSchema: object;
};

export type ToolWithClient = ToolMeta & {
  client: Client;
};
