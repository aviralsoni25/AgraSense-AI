"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2, PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { MapView } from "@/components/map-view";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { demoOutbreaks } from "@/lib/maps";
import type { OutbreakPoint, SeverityLevel } from "@/types";

export default function HeatmapPage() {
  const [points, setPoints] = useState<OutbreakPoint[]>(demoOutbreaks);
  const [selected, setSelected] = useState<OutbreakPoint | null>(null);
  const [loading, setLoading] = useState(true);
  const [disease, setDisease] = useState("Leaf Blight");
  const [locationName, setLocationName] = useState("Agra, Uttar Pradesh");
  const [severity, setSeverity] = useState<SeverityLevel>("medium");

  useEffect(() => {
    const loadOutbreaks = async () => {
      try {
        const response = await fetch("/api/outbreaks");
        const payload = (await response.json()) as { outbreaks: OutbreakPoint[] };
        if (payload.outbreaks?.length) {
          setPoints(payload.outbreaks);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    void loadOutbreaks();
  }, []);

  const trending = useMemo(() => {
    return [...points]
      .sort((a, b) => b.reports - a.reports)
      .slice(0, 5)
      .map((entry) => `${entry.disease} (${entry.locationName})`);
  }, [points]);

  const reportOutbreak = async () => {
    try {
      const payload = {
        disease,
        locationName,
        lat: 27.1767 + (Math.random() - 0.5) * 2,
        lng: 78.0081 + (Math.random() - 0.5) * 2,
        severity,
        reports: Math.floor(Math.random() * 15) + 1,
      };

      const response = await fetch("/api/outbreaks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("submit failed");

      setPoints((prev) => [
        {
          id: `local-${Date.now()}`,
          updatedAt: new Date().toISOString(),
          ...payload,
        },
        ...prev,
      ]);
      toast.success("Local disease report submitted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit report.");
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Regional Disease Outbreak Heatmap</h1>

        {loading ? (
          <Card className="rounded-2xl">
            <CardContent className="flex items-center gap-2 p-8 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading outbreak map...
            </CardContent>
          </Card>
        ) : null}

        <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
          <MapView points={points} selected={selected} onSelect={setSelected} />

          <div className="space-y-4">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Trending Nearby Diseases</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {trending.map((item) => (
                  <div key={item} className="rounded-xl border border-border px-3 py-2 text-sm">
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Report Local Disease</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input value={disease} onChange={(e) => setDisease(e.target.value)} placeholder="Disease name" />
                <Input
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  placeholder="Location"
                />
                <Select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value as SeverityLevel)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Select>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Community Intelligence</Badge>
                  <Button onClick={reportOutbreak}>
                    <PlusCircle className="h-4 w-4" />
                    Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
