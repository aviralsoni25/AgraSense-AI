"use client";

import { Download, Leaf, ShieldCheck, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DiseaseScanResult } from "@/types";
import { generateDiseaseReportPdf } from "@/lib/pdf";
import { toPercent } from "@/lib/utils";

type ResultCardProps = {
  result: DiseaseScanResult | null;
  onShare: () => void;
};

export function ResultCard({ result, onShare }: ResultCardProps) {
  if (!result) {
    return (
      <Card className="rounded-2xl">
        <CardContent className="flex h-full min-h-[420px] items-center justify-center p-8 text-center text-sm text-muted-foreground">
          Scan results will appear here after analysis.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl border-emerald-100">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <CardTitle className="text-xl">{result.disease}</CardTitle>
          <Badge
            variant={
              result.severity === "high"
                ? "danger"
                : result.severity === "medium"
                  ? "warning"
                  : "success"
            }
          >
            {result.severity.toUpperCase()} SEVERITY
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="font-medium">Confidence</span>
            <span>{toPercent(result.confidence)}</span>
          </div>
          <div className="h-2 rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary" style={{ width: `${result.confidence}%` }} />
          </div>
        </div>

        <section className="rounded-xl border border-border bg-muted/20 p-3">
          <p className="mb-1 flex items-center gap-2 text-sm font-semibold">
            <TriangleAlert className="h-4 w-4 text-amber-500" />
            Symptoms
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {result.symptoms.map((symptom) => (
              <li key={symptom}>• {symptom}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-border bg-muted/20 p-3">
          <p className="mb-1 flex items-center gap-2 text-sm font-semibold">
            <ShieldCheck className="h-4 w-4 text-primary" />
            Treatment Steps
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {result.treatments.map((step) => (
              <li key={step}>• {step}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-border bg-muted/20 p-3">
          <p className="mb-1 flex items-center gap-2 text-sm font-semibold">
            <Leaf className="h-4 w-4 text-emerald-600" />
            Organic Treatment
          </p>
          <p className="text-sm text-muted-foreground">{result.organicTreatment}</p>
        </section>

        <div className="rounded-xl border border-border p-3 text-sm">
          <p className="font-medium">Estimated Crop Loss Risk: {toPercent(result.cropLossRisk)}</p>
          <p className="mt-1 text-muted-foreground">
            Start treatment in next 24 hours to minimize damage.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button onClick={() => generateDiseaseReportPdf(result)}>
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button variant="secondary" onClick={onShare}>
            Share WhatsApp
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
