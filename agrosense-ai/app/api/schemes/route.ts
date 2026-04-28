import { NextResponse } from "next/server";
import { extractJson, generateGeminiText } from "@/lib/gemini";
import type { Scheme } from "@/types";

const fallbackSchemes: Scheme[] = [
  {
    id: "pm-kisan",
    title: "PM-KISAN",
    summary: "Direct income support of Rs. 6,000 per year in 3 installments.",
    eligibility: "Small and marginal landholding farmer families.",
    benefit: "Income support credited directly to bank account.",
    applyLink: "https://pmkisan.gov.in/",
  },
  {
    id: "pmfby",
    title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    summary: "Crop insurance coverage against natural calamities and yield loss.",
    eligibility: "Farmers growing notified crops in notified areas.",
    benefit: "Low premium and protection against crop damage.",
    applyLink: "https://pmfby.gov.in/",
  },
  {
    id: "kcc",
    title: "Kisan Credit Card",
    summary: "Short-term credit support for crop production and farm expenses.",
    eligibility: "Individual farmers and joint borrowers with land/cultivation proof.",
    benefit: "Working capital with subsidized interest rates.",
    applyLink: "https://www.myscheme.gov.in/",
  },
];

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      farmerType?: string;
      landSize?: string;
      state?: string;
    };

    const prompt = `
Recommend the top 3 Indian government schemes for:
- Farmer Type: ${body.farmerType ?? "Unknown"}
- Land Size: ${body.landSize ?? "Unknown"}
- State: ${body.state ?? "Unknown"}

Return strict JSON array with 3 objects:
{
  "id": "short-id",
  "title": string,
  "summary": string,
  "eligibility": string,
  "benefit": string,
  "applyLink": string
}
Use only real schemes. No markdown.
`;

    let schemes = fallbackSchemes;
    try {
      const response = await generateGeminiText(prompt);
      schemes = extractJson(response, fallbackSchemes);
    } catch {
      schemes = fallbackSchemes;
    }

    return NextResponse.json({ schemes });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to fetch schemes." }, { status: 500 });
  }
}
