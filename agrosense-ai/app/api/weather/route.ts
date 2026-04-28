import { NextResponse } from "next/server";
import { fetchWeather } from "@/lib/weather";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = Number(searchParams.get("lat") ?? 28.6139);
    const lng = Number(searchParams.get("lng") ?? 77.209);
    const location = searchParams.get("location") ?? "Delhi, India";

    const weather = await fetchWeather(lat, lng, location);
    return NextResponse.json(weather);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to fetch weather" }, { status: 500 });
  }
}
