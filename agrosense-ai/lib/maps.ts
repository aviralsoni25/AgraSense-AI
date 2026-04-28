import type { OutbreakPoint, SeverityLevel } from "@/types";

export const defaultMapCenter = { lat: 20.5937, lng: 78.9629 };
export const defaultMapZoom = 5;

export function severityColor(severity: SeverityLevel) {
  switch (severity) {
    case "high":
      return "#ef4444";
    case "medium":
      return "#f59e0b";
    default:
      return "#22c55e";
  }
}

export const demoOutbreaks: OutbreakPoint[] = [
  {
    id: "outbreak-1",
    disease: "Rice Blast",
    locationName: "Lucknow, Uttar Pradesh",
    lat: 26.8467,
    lng: 80.9462,
    severity: "high",
    reports: 18,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "outbreak-2",
    disease: "Wheat Rust",
    locationName: "Kota, Rajasthan",
    lat: 25.2138,
    lng: 75.8648,
    severity: "medium",
    reports: 11,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "outbreak-3",
    disease: "Cotton Leaf Curl",
    locationName: "Nagpur, Maharashtra",
    lat: 21.1458,
    lng: 79.0882,
    severity: "low",
    reports: 6,
    updatedAt: new Date().toISOString(),
  },
];
