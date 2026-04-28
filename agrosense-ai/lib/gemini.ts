import { GoogleGenerativeAI, type Part } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const modelName = "gemini-2.0-flash";

function getClient() {
  if (!apiKey) {
    return null;
  }
  return new GoogleGenerativeAI(apiKey);
}

export function extractJson<T>(rawText: string, fallback: T): T {
  try {
    const normalized = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    return JSON.parse(normalized) as T;
  } catch {
    return fallback;
  }
}

export async function generateGeminiText(prompt: string) {
  const client = getClient();
  if (!client) {
    throw new Error("Gemini API key missing. Set GEMINI_API_KEY.");
  }

  const model = client.getGenerativeModel({ model: modelName });
  const response = await model.generateContent(prompt);
  return response.response.text();
}

export async function generateGeminiVision(
  prompt: string,
  imageBase64: string,
  mimeType = "image/jpeg",
) {
  const client = getClient();
  if (!client) {
    throw new Error("Gemini API key missing. Set GEMINI_API_KEY.");
  }

  const model = client.getGenerativeModel({ model: modelName });
  const parts: Part[] = [
    { text: prompt },
    {
      inlineData: {
        data: imageBase64,
        mimeType,
      },
    },
  ];

  const response = await model.generateContent(parts);
  return response.response.text();
}
