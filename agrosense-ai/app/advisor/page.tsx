"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { generateRecommendationPdf } from "@/lib/pdf";
import { demoRecommendations } from "@/lib/demo-data";
import type { CropRecommendation } from "@/types";

type AdvisorForm = {
  soilType: string;
  state: string;
  district: string;
  season: string;
  waterAvailability: string;
  landSize: string;
  budget: string;
};

const initialForm: AdvisorForm = {
  soilType: "Loamy",
  state: "Uttar Pradesh",
  district: "Agra",
  season: "Kharif",
  waterAvailability: "Medium",
  landSize: "2 Acres",
  budget: "Medium",
};

export default function AdvisorPage() {
  const [form, setForm] = useState<AdvisorForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<CropRecommendation[]>([]);

  const update = (field: keyof AdvisorForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const generate = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/crop-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error("Advisor error");
      }
      const payload = (await response.json()) as { recommendations: CropRecommendation[] };
      setResults(payload.recommendations.length ? payload.recommendations : demoRecommendations);
      toast.success("Top 3 crops generated");
    } catch (error) {
      console.error(error);
      setResults(demoRecommendations);
      toast.info("Using demo crop recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Crop Recommendation Engine</h1>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Farm Input Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div className="space-y-2">
              <Label>Soil Type</Label>
              <Select value={form.soilType} onChange={(e) => update("soilType", e.target.value)}>
                <option>Loamy</option>
                <option>Clay</option>
                <option>Sandy</option>
                <option>Silty</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>State</Label>
              <Input value={form.state} onChange={(e) => update("state", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>District</Label>
              <Input
                value={form.district}
                onChange={(e) => update("district", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Season</Label>
              <Select value={form.season} onChange={(e) => update("season", e.target.value)}>
                <option>Kharif</option>
                <option>Rabi</option>
                <option>Zaid</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Water Availability</Label>
              <Select
                value={form.waterAvailability}
                onChange={(e) => update("waterAvailability", e.target.value)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Land Size</Label>
              <Input value={form.landSize} onChange={(e) => update("landSize", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Budget</Label>
              <Select value={form.budget} onChange={(e) => update("budget", e.target.value)}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </Select>
            </div>
          </CardContent>
          <CardContent className="pt-0">
            <Button onClick={generate} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Generate Recommendations
            </Button>
          </CardContent>
        </Card>

        {results.length ? (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Top 3 Crop Suggestions</h2>
              <Button
                variant="outline"
                onClick={() => generateRecommendationPdf(`${form.district}, ${form.state}`, results)}
              >
                Download PDF
              </Button>
            </div>
            <div className="grid gap-4 xl:grid-cols-3">
              {results.map((item) => (
                <Card key={item.crop} className="hover-lift rounded-2xl">
                  <CardHeader>
                    <CardTitle>{item.crop}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p>
                      <span className="font-semibold">Profit Score:</span> {item.expectedProfitScore}%
                    </p>
                    <p>
                      <span className="font-semibold">Water Need:</span> {item.waterNeed}
                    </p>
                    <p>
                      <span className="font-semibold">Risk Score:</span> {item.riskScore}%
                    </p>
                    <p>
                      <span className="font-semibold">Why Recommended:</span> {item.why}
                    </p>
                    <p>
                      <span className="font-semibold">Market Demand:</span> {item.marketDemand}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </AppShell>
  );
}
