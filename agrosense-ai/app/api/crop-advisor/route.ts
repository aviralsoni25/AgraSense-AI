import { NextResponse } from "next/server";
import { extractJson, generateGeminiText } from "@/lib/gemini";
import type { CropRecommendation } from "@/types";

const fallback: CropRecommendation[] = [
  {
    crop: "Millet (Bajra)",
    expectedProfitScore: 78,
    waterNeed: "Low",
    riskScore: 24,
    why: "Performs well in semi-arid climate and low rainfall conditions.",
    marketDemand: "Stable demand in local mandis and health-food markets.",
  },
  {
    crop: "Pulses (Moong)",
    expectedProfitScore: 74,
    waterNeed: "Low",
    riskScore: 28,
    why: "Short duration crop with low irrigation need and good soil impact.",
    marketDemand: "High demand due to protein consumption and government procurement.",
  },
  {
    crop: "Mustard",
    expectedProfitScore: 69,
    waterNeed: "Medium",
    riskScore: 34,
    why: "Suitable for rabi season with manageable input cost.",
    marketDemand: "Strong edible oil demand supports sale potential.",
  },
];

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      soilType?: string;
      state?: string;
      district?: string;
      season?: string;
      waterAvailability?: string;
      landSize?: string;
      budget?: string;
    };

    const prompt = `
You are a crop planning expert.
Given:
- Soil: ${body.soilType ?? "Unknown"}
- State: ${body.state ?? "Unknown"}
- District: ${body.district ?? "Unknown"}
- Season: ${body.season ?? "Unknown"}
- Water: ${body.waterAvailability ?? "Unknown"}
- Land Size: ${body.landSize ?? "Unknown"}
- Budget: ${body.budget ?? "Unknown"}

Return strict JSON array with exactly 3 objects:
{
 "crop": string,
 "expectedProfitScore": number 0-100,
 "waterNeed": "Low" | "Medium" | "High",
 "riskScore": number 0-100,
 "why": string,
 "marketDemand": string
}
No markdown.
`;

    let recommendations = fallback;
    try {
      const response = await generateGeminiText(prompt);
      recommendations = extractJson(response, fallback);
    } catch {
      recommendations = fallback;
    }

    return NextResponse.json({
      recommendations,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to generate crop plan." }, { status: 500 });
  }
}
