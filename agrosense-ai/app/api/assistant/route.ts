import { NextResponse } from "next/server";
import { generateGeminiText } from "@/lib/gemini";

const languageLabel = {
  en: "English",
  hi: "Hindi",
  hinglish: "Hinglish",
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      message?: string;
      language?: "en" | "hi" | "hinglish";
      weatherHint?: string;
    };

    if (!body.message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const language = body.language ?? "en";
    const prompt = `
You are AgroSense AI, an agriculture copilot for farmers.
Respond in ${languageLabel[language]}.
Keep answers practical, short, and action-oriented.
If uncertainty exists, clearly state it and suggest local agronomist verification.
Weather context (if provided): ${body.weatherHint ?? "Not available"}
User question: ${body.message}
`;

    let answer = "";
    try {
      answer = await generateGeminiText(prompt);
    } catch {
      answer =
        language === "hi"
          ? "नेटवर्क सीमित है। अभी के लिए फसल की फोटो साफ रोशनी में लें, सिंचाई हल्की रखें और नजदीकी कृषि अधिकारी से पुष्टि करें।"
          : language === "hinglish"
            ? "Network slow hai. Filhaal clear photo lo, irrigation halka rakho, aur local agriculture officer se confirm karo."
            : "Network is limited right now. Capture a clear image, keep irrigation light, and confirm with a local agriculture officer.";
    }

    return NextResponse.json({
      message: answer.trim(),
      language,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Assistant unavailable." }, { status: 500 });
  }
}
