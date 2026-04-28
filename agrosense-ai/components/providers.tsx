"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { Analytics } from "@/components/analytics";
import { PwaRegister } from "@/components/pwa-register";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <PwaRegister />
      <Analytics />
      {children}
      <Toaster richColors position="top-right" />
    </ThemeProvider>
  );
}
