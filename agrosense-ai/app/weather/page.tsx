"use client";

import { useEffect, useState } from "react";
import { CloudRain, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { WeatherCard } from "@/components/weather-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { defaultWeather } from "@/lib/demo-data";
import { getOfflineValue, setOfflineValue } from "@/hooks/use-offline-cache";
import type { WeatherSnapshot } from "@/types";

export default function WeatherPage() {
  const [weather, setWeather] = useState<WeatherSnapshot>(defaultWeather);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const cached = await getOfflineValue<WeatherSnapshot | null>(
          "agrosense:last-weather",
          null,
        );
        if (cached) {
          setWeather(cached);
        }

        const response = await fetch(
          `/api/weather?lat=27.1767&lng=78.0081&location=${encodeURIComponent("Agra, Uttar Pradesh")}`,
        );
        if (!response.ok) throw new Error("Weather fetch failed");
        const data = (await response.json()) as WeatherSnapshot;
        setWeather(data);
        await setOfflineValue("agrosense:last-weather", data);
      } catch (error) {
        console.error(error);
        toast.info("Using demo weather data.");
      } finally {
        setLoading(false);
      }
    };

    void loadWeather();
  }, []);

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Hyperlocal Weather Intelligence</h1>

        {loading ? (
          <Card className="rounded-2xl">
            <CardContent className="flex items-center gap-2 p-8 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Fetching weather insights...
            </CardContent>
          </Card>
        ) : (
          <WeatherCard weather={weather} />
        )}

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {weather.forecast.slice(0, 7).map((day) => (
            <Card key={day.date} className="rounded-2xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">
                  {new Date(day.date).toLocaleDateString("en-IN", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  })}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-1 text-sm">
                <p className="font-semibold">
                  {Math.round(day.maxTemp)}° / {Math.round(day.minTemp)}°
                </p>
                <p className="text-muted-foreground">Humidity: {Math.round(day.humidity)}%</p>
                <p className="text-muted-foreground">Rain: {Math.round(day.rainChance)}%</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <Card className="rounded-2xl border-indigo-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CloudRain className="h-4 w-4 text-primary" />
              AI Advisory
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Avoid spraying tomorrow if rain chance crosses 60%.</p>
            <p>• Irrigate lightly today to conserve water and reduce stress.</p>
            <p>• Strong wind alert means reduce foliar chemical application.</p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
