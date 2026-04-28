"use client";

import { motion } from "framer-motion";
import { Bot, CloudRain, MapPinned, ScanLine } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function DashboardPreview() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-emerald-500/25 via-lime-300/10 to-transparent blur-2xl" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative grid gap-3"
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "easeInOut" }}
        >
          <Card className="glass-card border-emerald-100/50">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <ScanLine className="h-4 w-4 text-primary" />
                Disease Scan
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm font-medium">Tomato Early Blight</p>
              <div className="mt-2 h-2 rounded-full bg-muted">
                <div className="h-full w-[88%] rounded-full bg-emerald-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-2 gap-3">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 4,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <Card className="glass-card">
              <CardContent className="flex items-center gap-2 p-4">
                <CloudRain className="h-4 w-4 text-sky-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Weather Alert</p>
                  <p className="text-sm font-semibold">Rain in 4 hours</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 4,
              ease: "easeInOut",
              delay: 0.9,
            }}
          >
            <Card className="glass-card">
              <CardContent className="flex items-center gap-2 p-4">
                <Bot className="h-4 w-4 text-violet-500" />
                <div>
                  <p className="text-xs text-muted-foreground">AI Assistant</p>
                  <p className="text-sm font-semibold">Hindi ready</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 4,
            ease: "easeInOut",
            delay: 1.2,
          }}
        >
          <Card className="glass-card">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                <MapPinned className="h-4 w-4 text-rose-500" />
                <div>
                  <p className="text-xs text-muted-foreground">Outbreak Heatmap</p>
                  <p className="text-sm font-semibold">2 nearby hotspots</p>
                </div>
              </div>
              <Badge variant="warning">Medium Risk</Badge>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
