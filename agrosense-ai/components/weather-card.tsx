import { CloudRain, Droplets, ThermometerSun, Wind } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { WeatherSnapshot } from "@/types";

type WeatherCardProps = {
  weather: WeatherSnapshot;
};

export function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <Card className="overflow-hidden rounded-2xl border-emerald-100 bg-gradient-to-br from-emerald-500/10 via-background to-background">
      <CardContent className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{weather.locationLabel}</p>
            <p className="text-4xl font-bold">{Math.round(weather.currentTemp)}°C</p>
            <p className="text-sm text-muted-foreground">{weather.condition}</p>
          </div>
          <CloudRain className="h-14 w-14 text-primary" />
        </div>
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="rounded-xl border border-border/60 bg-card/70 p-3">
            <p className="text-muted-foreground">Humidity</p>
            <p className="mt-2 flex items-center gap-1 font-semibold">
              <Droplets className="h-4 w-4 text-sky-500" />
              {Math.round(weather.humidity)}%
            </p>
          </div>
          <div className="rounded-xl border border-border/60 bg-card/70 p-3">
            <p className="text-muted-foreground">Rain Chance</p>
            <p className="mt-2 flex items-center gap-1 font-semibold">
              <CloudRain className="h-4 w-4 text-indigo-500" />
              {Math.round(weather.rainChance)}%
            </p>
          </div>
          <div className="rounded-xl border border-border/60 bg-card/70 p-3">
            <p className="text-muted-foreground">Peak Temp</p>
            <p className="mt-2 flex items-center gap-1 font-semibold">
              <ThermometerSun className="h-4 w-4 text-orange-500" />
              {Math.round(weather.forecast[0]?.maxTemp ?? weather.currentTemp)}°C
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-border/60 bg-card/70 p-3 text-sm">
          <p className="mb-2 font-medium">AI Advisory</p>
          <ul className="space-y-1.5 text-muted-foreground">
            {weather.advisory.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Wind className="h-3.5 w-3.5 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
