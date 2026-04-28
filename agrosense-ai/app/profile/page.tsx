"use client";

import { Award, MapPin, Sprout, User } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-4xl space-y-6">
        <h1 className="text-2xl font-semibold">Farmer Profile</h1>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border p-4">
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="mt-1 flex items-center gap-2 font-medium">
                <User className="h-4 w-4 text-primary" />
                Ravi Singh
              </p>
            </div>
            <div className="rounded-xl border border-border p-4">
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="mt-1 flex items-center gap-2 font-medium">
                <MapPin className="h-4 w-4 text-primary" />
                Agra, Uttar Pradesh
              </p>
            </div>
            <div className="rounded-xl border border-border p-4">
              <p className="text-sm text-muted-foreground">Farm Size</p>
              <p className="mt-1 font-medium">2.4 Acres</p>
            </div>
            <div className="rounded-xl border border-border p-4">
              <p className="text-sm text-muted-foreground">Preferred Language</p>
              <p className="mt-1 font-medium">Hindi</p>
            </div>
            <div className="rounded-xl border border-border p-4 sm:col-span-2">
              <p className="text-sm text-muted-foreground">Main Crop</p>
              <p className="mt-1 flex items-center gap-2 font-medium">
                <Sprout className="h-4 w-4 text-primary" />
                Wheat and Mustard
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Achievement Badges</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Badge variant="success">
              <Award className="mr-1 h-3 w-3" />
              Early Detector
            </Badge>
            <Badge variant="secondary">Smart Farmer</Badge>
            <Badge variant="outline">10 scans completed</Badge>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
