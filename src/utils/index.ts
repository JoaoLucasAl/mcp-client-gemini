import { Type } from "@google/genai";

type JSONSchema = Record<string, any>;

function mapJsonTypeToGenAI(type: string): Type {
  switch (type) {
    case "string":
      return Type.STRING;
    case "number":
    case "integer":
      return Type.NUMBER;
    case "boolean":
      return Type.BOOLEAN;
    case "array":
      return Type.ARRAY;
    case "object":
      return Type.OBJECT;
    default:
      return Type.STRING;
  }
}

function convertSchema(schema: JSONSchema): any {
  const result: any = {
    type: mapJsonTypeToGenAI(schema.type || "object"),
  };

  if (schema.description) result.description = schema.description;
  if (schema.default !== undefined) result.default = schema.default;

  if (schema.type === "object" && schema.properties) {
    result.properties = {};
    for (const [key, value] of Object.entries(schema.properties)) {
      //@ts-ignore
      result.properties[key] = convertSchema(value);
    }
    if (Array.isArray(schema.required)) {
      result.required = schema.required;
    }
  }

  if (schema.type === "array" && schema.items) {
    result.items = convertSchema(schema.items);
  }

  return result;
}

export function jsonSchemaToFunctionDeclaration(schemaWithMeta: {
  name: string;
  description: string;
  inputSchema: JSONSchema;
}) {
  const { name, description, inputSchema } = schemaWithMeta;

  return {
    name,
    description,
    parameters: convertSchema(inputSchema),
  };
}
