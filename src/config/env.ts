import dotenv from "dotenv";
import path from "path";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
export const CONFIG_PATH = path.resolve(process.env.CONFIG_PATH!);
