"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, CloudSun, Mic, ScanLine, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { DashboardPreview } from "@/components/dashboard-preview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  { title: "Disease Scan", icon: ScanLine, text: "Instant AI-powered crop disease diagnostics." },
  { title: "Voice AI", icon: Mic, text: "Hindi, English, and Hinglish farming assistant." },
  { title: "Crop Advisor", icon: Shield, text: "Season, soil, and budget-based crop planning." },
  { title: "Weather Alerts", icon: CloudSun, text: "Hyperlocal advisories with Open-Meteo intelligence." },
  { title: "Heatmap", icon: Shield, text: "Regional outbreak insights powered by Google Maps." },
  { title: "Offline Mode", icon: CheckCircle2, text: "Rural-first caching for low-connectivity regions." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-7"
          >
            <p className="inline-flex rounded-full border border-emerald-200 bg-emerald-100/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Build with AI Solution Challenge 2026
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              AI for Every Farmer.
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              Detect disease early, get local-language advice, and optimize your farm with AI.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/dashboard">
                <Button size="lg">
                  Try Live Demo
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 text-sm">
              <div>
                <p className="text-2xl font-bold text-primary">30%</p>
                <p className="text-muted-foreground">Crop loss preventable</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">10 sec</p>
                <p className="text-muted-foreground">Diagnosis speed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">3</p>
                <p className="text-muted-foreground">Language support</p>
              </div>
            </div>
          </motion.div>
          <DashboardPreview />
        </section>

        <section id="features" className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 }}
              >
                <Card className="hover-lift h-full rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <feature.icon className="h-5 w-5 text-primary" />
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">{feature.text}</CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="solutions" className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <Card className="rounded-3xl bg-gradient-to-r from-emerald-700 to-emerald-500 text-white">
            <CardContent className="grid gap-8 p-8 md:grid-cols-3">
              {[
                ["1", "Upload", "Capture a crop image from field."],
                ["2", "Analyze", "Gemini vision and weather risk reasoning."],
                ["3", "Act", "Get treatment, prevention, and next steps."],
              ].map(([step, title, text]) => (
                <div key={step} className="space-y-2">
                  <p className="text-3xl font-bold">{step}</p>
                  <p className="text-xl font-semibold">{title}</p>
                  <p className="text-sm text-emerald-100">{text}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section id="demo" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h2 className="text-2xl font-semibold">Trusted by forward-thinking growers</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              "“Disease detection helped us intervene 5 days earlier.”",
              "“Hindi voice assistant increased adoption by workers.”",
              "“Weather + crop advice improved our season planning.”",
            ].map((quote) => (
              <Card key={quote} className="rounded-2xl">
                <CardContent className="p-6 text-sm text-muted-foreground">{quote}</CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer id="about" className="border-t border-border py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 text-sm text-muted-foreground sm:px-6">
          <p>AgroSense AI © 2026</p>
          <p>Built for resilient farming ecosystems.</p>
        </div>
      </footer>
    </div>
  );
}
