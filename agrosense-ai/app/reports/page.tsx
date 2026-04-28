"use client";

import { useMemo } from "react";
import { Download, FileDown, History, SaveAll } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { recentScans } from "@/lib/demo-data";

function toCsv() {
  const rows = [["Disease", "Confidence", "Severity", "Location", "Date"]];
  recentScans.forEach((scan) => {
    rows.push([
      scan.disease,
      String(scan.confidence),
      scan.severity,
      scan.location ?? "",
      new Date(scan.createdAt).toLocaleString("en-IN"),
    ]);
  });

  const csv = rows.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "agrosense-reports.csv";
  anchor.click();
  URL.revokeObjectURL(url);
}

export default function ReportsPage() {
  const summary = useMemo(
    () => [
      { label: "Scan History", value: recentScans.length, icon: History },
      { label: "Saved Recommendations", value: 12, icon: SaveAll },
      { label: "Downloadable PDFs", value: 9, icon: FileDown },
      { label: "Export CSV", value: 1, icon: Download },
    ],
    [],
  );

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Reports & Exports</h1>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summary.map((item) => (
            <Card key={item.label} className="rounded-2xl">
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="text-2xl font-bold">{item.value}</p>
                </div>
                <item.icon className="h-5 w-5 text-primary" />
              </CardContent>
            </Card>
          ))}
        </section>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Scan History</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Disease</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentScans.map((scan) => (
                  <TableRow key={scan.id}>
                    <TableCell className="font-medium">{scan.disease}</TableCell>
                    <TableCell>{scan.confidence}%</TableCell>
                    <TableCell>
                      <Badge variant={scan.severity === "high" ? "danger" : "secondary"}>
                        {scan.severity}
                      </Badge>
                    </TableCell>
                    <TableCell>{scan.location}</TableCell>
                    <TableCell>{new Date(scan.createdAt).toLocaleDateString("en-IN")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex flex-wrap gap-2">
              <Button onClick={toCsv}>Export CSV</Button>
              <Button variant="outline">Download All PDFs</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
