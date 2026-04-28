"use client";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { CropRecommendation, DiseaseScanResult } from "@/types";

export function generateDiseaseReportPdf(scan: DiseaseScanResult) {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("AgroSense AI - Disease Report", 14, 18);

  doc.setFontSize(11);
  doc.text(`Generated: ${new Date(scan.createdAt).toLocaleString("en-IN")}`, 14, 26);
  doc.text(`Disease: ${scan.disease}`, 14, 33);
  doc.text(`Confidence: ${scan.confidence}%`, 14, 40);
  doc.text(`Severity: ${scan.severity.toUpperCase()}`, 14, 47);
  doc.text(`Crop Loss Risk: ${scan.cropLossRisk}%`, 14, 54);

  autoTable(doc, {
    startY: 62,
    head: [["Section", "Details"]],
    body: [
      ["Symptoms", scan.symptoms.join(", ")],
      ["Treatment", scan.treatments.join(" | ")],
      ["Organic Treatment", scan.organicTreatment],
      ["Prevention", scan.preventionTips.join(" | ")],
    ],
    styles: { fontSize: 10, cellPadding: 2.5 },
  });

  doc.save(`agrosense-report-${scan.id}.pdf`);
}

export function generateRecommendationPdf(
  location: string,
  recommendations: CropRecommendation[],
) {
  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text("AgroSense AI - Crop Recommendation", 14, 18);
  doc.setFontSize(11);
  doc.text(`Location: ${location}`, 14, 26);
  doc.text(`Generated: ${new Date().toLocaleString("en-IN")}`, 14, 33);

  autoTable(doc, {
    startY: 40,
    head: [["Crop", "Profit", "Water Need", "Risk", "Market Demand"]],
    body: recommendations.map((item) => [
      item.crop,
      `${item.expectedProfitScore}%`,
      item.waterNeed,
      `${item.riskScore}%`,
      item.marketDemand,
    ]),
    styles: { fontSize: 10, cellPadding: 2.5 },
  });

  doc.save("agrosense-crop-advice.pdf");
}