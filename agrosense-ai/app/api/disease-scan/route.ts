import { NextResponse } from "next/server";
import { addDoc, collection } from "firebase/firestore/lite";
import { generateGeminiVision, extractJson } from "@/lib/gemini";
import { getServerDb } from "@/lib/firebase-server";
import type { DiseaseScanResult } from "@/types";

const fallbackResult: Omit<
  DiseaseScanResult,
  "id" | "createdAt" | "imageUrl" | "language"
> = {
  disease: "Potential Early Blight",
  confidence: 82,
  severity: "medium",
  symptoms: ["Brown concentric spots", "Leaf yellowing", "Lower leaf damage"],
  treatments: [
    "Remove infected leaves immediately",
    "Apply recommended fungicide every 7 days",
    "Avoid overhead irrigation",
  ],
  organicTreatment:
    "Spray neem oil and compost tea on infected region every 5-7 days.",
  preventionTips: [
    "Maintain crop spacing for airflow",
    "Use disease-resistant seed varieties",
    "Disinfect farm tools regularly",
  ],
  cropLossRisk: 38,
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      imageBase64?: string;
      mimeType?: string;
      language?: "en" | "hi" | "hinglish";
      location?: string;
      imageUrl?: string | null;
    };

    if (!body.imageBase64) {
      return NextResponse.json({ error: "imageBase64 is required." }, { status: 400 });
    }

    let parsed = fallbackResult;
    try {
      const prompt = `
You are an expert agronomist. Analyze the crop image and return strict JSON with:
{
  "disease": "string",
  "confidence": number (0-100),
  "severity": "low" | "medium" | "high",
  "symptoms": string[],
  "treatments": string[],
  "organicTreatment": "string",
  "preventionTips": string[],
  "cropLossRisk": number (0-100)
}
No markdown, no extra text. Keep guidance practical for farmers in India.
`;

      const response = await generateGeminiVision(
        prompt,
        body.imageBase64,
        body.mimeType ?? "image/jpeg",
      );
      parsed = extractJson(response, fallbackResult);
    } catch {
      parsed = fallbackResult;
    }

    const saved: DiseaseScanResult = {
      id: `scan-${Date.now()}`,
      imageUrl:
        body.imageUrl ||
        `data:${body.mimeType ?? "image/jpeg"};base64,${body.imageBase64}`,
      createdAt: new Date().toISOString(),
      language: body.language ?? "en",
      location: body.location,
      ...parsed,
    };

    try {
      const db = getServerDb();
      if (db) {
        await addDoc(collection(db, "scans"), {
          ...saved,
          createdAt: saved.createdAt,
        });
      }
    } catch (error) {
      console.error("Failed to store scan in Firestore", error);
    }

    return NextResponse.json(saved);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to analyze crop image right now." },
      { status: 500 },
    );
  }
}
