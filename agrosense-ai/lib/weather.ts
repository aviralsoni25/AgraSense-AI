import type { WeatherDay, WeatherSnapshot } from "@/types";

type OpenMeteoResponse = {
  current?: {
    temperature_2m: number;
    relative_humidity_2m: number;
    precipitation_probability: number;
    weather_code: number;
  };
  daily?: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
    relative_humidity_2m_mean: number[];
    wind_speed_10m_max: number[];
  };
};

const weatherCodeMap: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  71: "Slight snow",
  80: "Rain showers",
  81: "Rain showers",
  82: "Violent rain showers",
  95: "Thunderstorm",
};

function weatherAdvisory(day: WeatherDay) {
  const notes: string[] = [];
  if (day.rainChance > 60) {
    notes.push("Avoid pesticide spraying due to high rain probability.");
  }
  if (day.windSpeed > 20) {
    notes.push("Secure young plants and avoid broad spraying during high winds.");
  }
  if (day.maxTemp > 37) {
    notes.push("Use mulching and light irrigation in late afternoon to reduce heat stress.");
  }
  if (day.humidity > 80) {
    notes.push("Fungal disease risk is high. Monitor leaves closely.");
  }
  if (!notes.length) {
    notes.push("Weather is favorable for routine farm operations.");
  }
  return notes;
}

export async function fetchWeather(
  latitude: number,
  longitude: number,
  locationLabel: string,
): Promise<WeatherSnapshot> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(latitude));
  url.searchParams.set("longitude", String(longitude));
  url.searchParams.set("current", "temperature_2m,relative_humidity_2m,precipitation_probability,weather_code");
  url.searchParams.set(
    "daily",
    "temperature_2m_max,temperature_2m_min,precipitation_probability_max,relative_humidity_2m_mean,wind_speed_10m_max",
  );
  url.searchParams.set("forecast_days", "7");
  url.searchParams.set("timezone", "auto");

  const response = await fetch(url, { next: { revalidate: 1800 } });
  if (!response.ok) {
    throw new Error("Failed to fetch weather data.");
  }

  const data = (await response.json()) as OpenMeteoResponse;
  const forecast: WeatherDay[] = (data.daily?.time ?? []).map((date, index) => ({
    date,
    minTemp: data.daily?.temperature_2m_min?.[index] ?? 0,
    maxTemp: data.daily?.temperature_2m_max?.[index] ?? 0,
    rainChance: data.daily?.precipitation_probability_max?.[index] ?? 0,
    humidity: data.daily?.relative_humidity_2m_mean?.[index] ?? 0,
    windSpeed: data.daily?.wind_speed_10m_max?.[index] ?? 0,
  }));

  const today = forecast[0];
  const advisory = today ? weatherAdvisory(today) : ["Weather advisory unavailable."];

  return {
    locationLabel,
    latitude,
    longitude,
    currentTemp: data.current?.temperature_2m ?? 0,
    humidity: data.current?.relative_humidity_2m ?? 0,
    rainChance: data.current?.precipitation_probability ?? 0,
    condition: weatherCodeMap[data.current?.weather_code ?? 0] ?? "Unknown",
    forecast,
    advisory,
  };
}
