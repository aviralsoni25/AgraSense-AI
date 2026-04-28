"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { SchemeCard } from "@/components/scheme-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { demoSchemes } from "@/lib/demo-data";
import type { Scheme } from "@/types";

export default function SchemesPage() {
  const [farmerType, setFarmerType] = useState("Small");
  const [landSize, setLandSize] = useState("2 Acres");
  const [state, setState] = useState("Uttar Pradesh");
  const [loading, setLoading] = useState(false);
  const [schemes, setSchemes] = useState<Scheme[]>(demoSchemes);

  const generate = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/schemes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ farmerType, landSize, state }),
      });
      const payload = (await response.json()) as { schemes: Scheme[] };
      setSchemes(payload.schemes?.length ? payload.schemes : demoSchemes);
      toast.success("Eligible schemes loaded");
    } catch (error) {
      console.error(error);
      setSchemes(demoSchemes);
      toast.info("Showing demo schemes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Government Scheme Discovery</h1>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Eligibility Inputs</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Farmer Type</Label>
              <Select value={farmerType} onChange={(e) => setFarmerType(e.target.value)}>
                <option>Small</option>
                <option>Marginal</option>
                <option>Tenant</option>
                <option>Women Farmer</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Land Size</Label>
              <Input value={landSize} onChange={(e) => setLandSize(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>State</Label>
              <Input value={state} onChange={(e) => setState(e.target.value)} />
            </div>
          </CardContent>
          <CardContent className="pt-0">
            <Button onClick={generate} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              Find Eligible Schemes
            </Button>
          </CardContent>
        </Card>

        <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {schemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </section>
      </div>
    </AppShell>
  );
}
