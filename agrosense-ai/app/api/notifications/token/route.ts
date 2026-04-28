import { NextResponse } from "next/server";
import { addDoc, collection } from "firebase/firestore/lite";
import { getServerDb } from "@/lib/firebase-server";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { token?: string; platform?: string };
    if (!body.token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    const db = getServerDb();
    if (!db) {
      return NextResponse.json({ success: true, mode: "demo" });
    }

    await addDoc(collection(db, "deviceTokens"), {
      token: body.token,
      platform: body.platform ?? "web",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, mode: "firestore" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save token" }, { status: 500 });
  }
}
