import { NextResponse } from "next/server";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore/lite";
import { demoOutbreaks } from "@/lib/maps";
import { getServerDb } from "@/lib/firebase-server";
import type { OutbreakPoint } from "@/types";

export async function GET() {
  try {
    const db = getServerDb();
    if (!db) {
      return NextResponse.json({ outbreaks: demoOutbreaks, source: "demo" });
    }

    const snapshot = await getDocs(
      query(collection(db, "outbreaks"), orderBy("updatedAt", "desc"), limit(200)),
    );

    const outbreaks: OutbreakPoint[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<OutbreakPoint, "id">),
    }));

    if (!outbreaks.length) {
      return NextResponse.json({ outbreaks: demoOutbreaks, source: "demo" });
    }

    return NextResponse.json({ outbreaks, source: "firestore" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ outbreaks: demoOutbreaks, source: "demo" });
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Omit<OutbreakPoint, "id" | "updatedAt">;
    const payload: Omit<OutbreakPoint, "id"> = {
      ...body,
      updatedAt: new Date().toISOString(),
    };

    const db = getServerDb();
    if (!db) {
      return NextResponse.json({ success: true, mode: "demo" });
    }

    await addDoc(collection(db, "outbreaks"), payload);
    return NextResponse.json({ success: true, mode: "firestore" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to submit outbreak report." }, { status: 500 });
  }
}
