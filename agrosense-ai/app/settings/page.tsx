"use client";

import { useState } from "react";
import { BellRing, Languages, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app-shell";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { requestFcmToken } from "@/lib/firebase";

export default function SettingsPage() {
  const [language, setLanguage] = useState("Hindi");
  const [phone, setPhone] = useState("+91 ");

  const enablePush = async () => {
    try {
      const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
      if (!vapidKey) {
        toast.info("Set NEXT_PUBLIC_FIREBASE_VAPID_KEY to enable FCM notifications.");
        return;
      }

      const token = await requestFcmToken(vapidKey);
      if (!token) {
        toast.info("Push notifications are unavailable in this browser/configuration.");
        return;
      }

      const response = await fetch("/api/notifications/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, platform: "web" }),
      });
      if (!response.ok) {
        throw new Error("Unable to persist notification token.");
      }
      toast.success("Push notifications enabled");
    } catch (error) {
      console.error(error);
      toast.error("Unable to enable push notifications.");
    }
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-2xl font-semibold">Settings</h1>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="h-4 w-4 text-primary" />
              Language & Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Preferred Assistant Language</Label>
              <Select value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option>Hindi</option>
                <option>English</option>
                <option>Hinglish</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Phone Number for Alerts</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <Button onClick={() => toast.success("Preferences saved")}>Save Preferences</Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BellRing className="h-4 w-4 text-primary" />
              Alerts & Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="rounded-xl border border-border p-3">
              Enable crop disease and weather alerts from Firebase Cloud Messaging.
            </p>
            <Button variant="outline" onClick={enablePush}>
              Enable Push Notifications
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Display & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Toggle dark mode theme</p>
            <ThemeToggle />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
