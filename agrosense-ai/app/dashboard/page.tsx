"use client";

import Link from "next/link";
import { AlertTriangle, BookmarkCheck, Leaf, ScanSearch, TrendingUp } from "lucide-react";
import {
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import { AppShell } from "@/components/app-shell";
import { ChartCard } from "@/components/chart-card";
import { StatCard } from "@/components/stat-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  dashboardMetrics,
  diseaseCategoryData,
  monthlyScans,
  recentScans,
} from "@/lib/demo-data";

const pieColors = ["#10b981", "#14b8a6", "#f59e0b", "#6366f1"];

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Farmer Analytics Dashboard</h1>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Scans"
            value={dashboardMetrics.totalScans}
            delta="+12% vs last month"
            icon={ScanSearch}
          />
          <StatCard
            title="Active Alerts"
            value={dashboardMetrics.activeAlerts}
            delta="+2 new today"
            icon={AlertTriangle}
          />
          <StatCard
            title="Saved Reports"
            value={dashboardMetrics.savedReports}
            delta="+8 this week"
            icon={BookmarkCheck}
          />
          <StatCard
            title="Yield Score"
            value={dashboardMetrics.yieldScore}
            suffix="%"
            delta="+5% projected"
            icon={TrendingUp}
          />
        </section>

        <section className="grid gap-4 xl:grid-cols-2">
          <ChartCard title="Monthly Scans" description="Disease scan trend across the year">
            <ResponsiveContainer width="100%" height={290}>
              <LineChart data={monthlyScans}>
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Line type="monotone" dataKey="scans" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Disease Categories" description="Distribution of detected disease types">
            <ResponsiveContainer width="100%" height={290}>
              <PieChart>
                <Pie
                  data={diseaseCategoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={100}
                  dataKey="value"
                  paddingAngle={4}
                >
                  {diseaseCategoryData.map((entry, index) => (
                    <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </section>

        <section>
          <Card className="rounded-2xl border-emerald-200 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm uppercase tracking-wide text-emerald-100">AI Smart Insight</p>
                <p className="mt-1 text-lg font-semibold">
                  Humidity rising this week. Fungal risk high.
                </p>
              </div>
              <Badge variant="warning" className="bg-white/90 text-emerald-700">
                Action Needed
              </Badge>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-semibold">Recent Scans</h2>
          <Card className="rounded-2xl">
            <CardContent className="p-0">
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
                      </TableCell>
                      <TableCell>{scan.location}</TableCell>
                      <TableCell>{new Date(scan.createdAt).toLocaleDateString("en-IN")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Link href="/scanner">
            <Button className="h-12 w-full justify-start rounded-xl">Scan Crop</Button>
          </Link>
          <Link href="/assistant">
            <Button variant="secondary" className="h-12 w-full justify-start rounded-xl">
              Ask AI
            </Button>
          </Link>
          <Link href="/weather">
            <Button variant="outline" className="h-12 w-full justify-start rounded-xl">
              Check Weather
            </Button>
          </Link>
          <Link href="/advisor">
            <Button variant="outline" className="h-12 w-full justify-start rounded-xl">
              <Leaf className="h-4 w-4" />
              Recommend Crop
            </Button>
          </Link>
        </section>
      </div>
    </AppShell>
  );
}
