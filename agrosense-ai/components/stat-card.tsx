"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type StatCardProps = {
  title: string;
  value: number;
  suffix?: string;
  delta?: string;
  icon: React.ComponentType<{ className?: string }>;
};

export function StatCard({ title, value, suffix, delta, icon: Icon }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    const duration = 900;
    const startedAt = performance.now();

    const update = (timestamp: number) => {
      const progress = Math.min((timestamp - startedAt) / duration, 1);
      setDisplayValue(Math.round(progress * value));
      if (progress < 1) {
        frame = requestAnimationFrame(update);
      }
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="hover-lift"
    >
      <Card className="rounded-2xl">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <span className="rounded-lg bg-primary/10 p-2">
            <Icon className="h-4 w-4 text-primary" />
          </span>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold tracking-tight">
            {displayValue}
            {suffix}
          </div>
          {delta && (
            <p className="mt-2 flex items-center gap-1 text-xs text-emerald-600">
              <ArrowUpRight className="h-3 w-3" />
              {delta}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
