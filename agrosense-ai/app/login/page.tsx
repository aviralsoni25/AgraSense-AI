"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Leaf, Loader2, Tractor } from "lucide-react";
import { toast } from "sonner";
import { isFirebaseConfigured, signInWithEmail, signInWithGoogle } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async () => {
    if (!email || !password) {
      toast.error("Enter email and password.");
      return;
    }
    setLoading(true);
    try {
      if (isFirebaseConfigured) {
        await signInWithEmail(email, password);
      } else {
        localStorage.setItem("agrosense-demo-user", JSON.stringify({ email, mode: "demo" }));
      }
      toast.success("Welcome to AgroSense AI");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      if (isFirebaseConfigured) {
        await signInWithGoogle();
      } else {
        localStorage.setItem(
          "agrosense-demo-user",
          JSON.stringify({ email: "demo@agrosense.ai", mode: "demo-google" }),
        );
      }
      toast.success("Signed in successfully");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  };

  const continueDemo = () => {
    localStorage.setItem(
      "agrosense-demo-user",
      JSON.stringify({ email: "demo@agrosense.ai", mode: "demo" }),
    );
    toast.success("Demo mode enabled");
    router.push("/dashboard");
  };

  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <section className="relative hidden overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-500 p-10 text-white lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_45%)]" />
        <div className="relative flex h-full flex-col justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs">
            <Leaf className="h-4 w-4" />
            Agri Intelligence Platform
          </div>
          <div>
            <h1 className="max-w-md text-5xl font-semibold leading-tight">
              Helping every farm become climate-smart.
            </h1>
            <p className="mt-4 max-w-md text-emerald-50/90">
              AI diagnostics, multilingual support, and predictive weather insights for better decisions.
            </p>
          </div>
          <div className="rounded-2xl border border-white/30 bg-white/10 p-4">
            <p className="text-sm">
              &quot;AgroSense helped us act faster on leaf disease and reduce crop loss.&quot;
            </p>
            <p className="mt-2 text-xs text-emerald-100">Farmer Producer Organization, Uttar Pradesh</p>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="glass-card w-full max-w-md rounded-3xl border-white/20">
            <CardHeader className="space-y-3">
              <div className="flex items-center gap-2">
                <Tractor className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl">Login to AgroSense AI</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Access scanner, assistant, weather, and farm insights.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="farmer@agrosense.ai"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                />
              </div>
              <Button onClick={handleEmailLogin} className="w-full" disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Login
              </Button>
              <Button variant="outline" onClick={handleGoogle} className="w-full" disabled={loading}>
                Continue with Google
              </Button>
              <Button variant="secondary" onClick={continueDemo} className="w-full">
                Continue as Demo User
              </Button>
              {!isFirebaseConfigured ? (
                <p className="text-xs text-amber-600">
                  Firebase env vars not configured. Running in demo auth mode.
                </p>
              ) : null}
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </main>
  );
}
