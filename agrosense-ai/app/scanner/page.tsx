"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { ResultCard } from "@/components/result-card";
import { UploadZone } from "@/components/upload-zone";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isFirebaseConfigured, uploadScanImage } from "@/lib/firebase";
import { recentScans } from "@/lib/demo-data";
import { getOfflineValue, setOfflineValue } from "@/hooks/use-offline-cache";
import type { DiseaseScanResult } from "@/types";

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const value = reader.result;
      if (typeof value === "string") {
        const base64 = value.split(",")[1];
        resolve(base64);
      } else {
        reject(new Error("Invalid image."));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ScannerPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<DiseaseScanResult | null>(null);
  const [loading, setLoading] = useState(false);

  const previewUrl = useMemo(
    () => (selectedFile ? URL.createObjectURL(selectedFile) : null),
    [selectedFile],
  );

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    const loadCached = async () => {
      const cached = await getOfflineValue<DiseaseScanResult | null>(
        "agrosense:last-scan",
        null,
      );
      if (cached) {
        setResult(cached);
      }
    };

    void loadCached();
  }, []);

  const analyze = async () => {
    if (!selectedFile) {
      toast.error("Upload a crop image first.");
      return;
    }
    setLoading(true);

    try {
      const imageBase64 = await fileToBase64(selectedFile);
      const uploadedUrl = isFirebaseConfigured
        ? await uploadScanImage(selectedFile).catch(() => null)
        : null;

      const response = await fetch("/api/disease-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64,
          mimeType: selectedFile.type,
          language: "en",
          location: "Agra, Uttar Pradesh",
          imageUrl: uploadedUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Scan failed");
      }

      const data = (await response.json()) as DiseaseScanResult;
      setResult(data);
      await setOfflineValue("agrosense:last-scan", data);
      toast.success("Analysis complete");
    } catch (error) {
      console.error(error);
      toast.error("Unable to analyze image right now.");
    } finally {
      setLoading(false);
    }
  };

  const shareWhatsapp = () => {
    if (!result) return;
    const message = encodeURIComponent(
      `AgroSense AI report: ${result.disease} (${result.confidence}% confidence). Suggested action: ${result.treatments[0]}`,
    );
    window.open(`https://wa.me/?text=${message}`, "_blank", "noopener,noreferrer");
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">AI Crop Disease Scanner</h1>

        <div className="grid gap-4 xl:grid-cols-2">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Upload Crop Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <UploadZone onFile={setSelectedFile} previewUrl={previewUrl} />

              <Button onClick={analyze} className="w-full" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {loading ? "Analyzing your crop..." : "Analyze with Gemini"}
              </Button>

              <div className="space-y-2">
                <p className="text-sm font-medium">Recent scans</p>
                <div className="space-y-2">
                  {recentScans.slice(0, 3).map((scan) => (
                    <div
                      key={scan.id}
                      className="flex items-center justify-between rounded-xl border border-border p-3 text-sm"
                    >
                      <div>
                        <p className="font-medium">{scan.disease}</p>
                        <p className="text-xs text-muted-foreground">{scan.location}</p>
                      </div>
                      <Badge
                        variant={
                          scan.severity === "high"
                            ? "danger"
                            : scan.severity === "medium"
                              ? "warning"
                              : "success"
                        }
                      >
                        {scan.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <ResultCard result={result} onShare={shareWhatsapp} />
        </div>
      </div>
    </AppShell>
  );
}
