"use client";

import Image from "next/image";
import { Bell, Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Topbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center gap-3 px-4 sm:px-6">
        <div className="relative hidden w-full max-w-sm items-center md:flex">
          <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search crops, diseases, reports..."
            className="rounded-xl pl-9"
          />
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
          </Button>
          <ThemeToggle />
          <button
            type="button"
            className="ml-1 flex items-center gap-2 rounded-xl border border-border px-2 py-1 hover:bg-muted"
          >
            <Image
              src="https://images.unsplash.com/photo-1640270167665-a2719b5c9d6c?auto=format&fit=crop&w=72&q=80"
              alt="User avatar"
              width={28}
              height={28}
              className="h-7 w-7 rounded-lg object-cover"
            />
            <span className="hidden text-sm font-medium sm:inline">Ravi Farmer</span>
          </button>
        </div>
      </div>
    </header>
  );
}
