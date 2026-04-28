"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BellRing,
  Bot,
  ChartNoAxesCombined,
  CloudSun,
  FileBarChart2,
  Home,
  Leaf,
  MapPinned,
  ScanLine,
  Settings,
  UserCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/scanner", label: "Scanner", icon: ScanLine },
  { href: "/assistant", label: "Assistant", icon: Bot },
  { href: "/advisor", label: "Crop Advisor", icon: Leaf },
  { href: "/weather", label: "Weather", icon: CloudSun },
  { href: "/heatmap", label: "Heatmap", icon: MapPinned },
  { href: "/schemes", label: "Schemes", icon: BellRing },
  { href: "/reports", label: "Reports", icon: FileBarChart2 },
  { href: "/profile", label: "Profile", icon: UserCircle2 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      <aside className="hidden h-screen w-72 shrink-0 border-r border-border bg-card/70 px-4 py-5 backdrop-blur xl:block">
        <Link href="/" className="flex items-center gap-3 px-2 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <ChartNoAxesCombined className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-lg font-bold tracking-tight">AgroSense AI</p>
            <p className="text-xs text-muted-foreground">Rural Intelligence Suite</p>
          </div>
        </Link>

        <nav className="mt-6 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active =
              pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 p-2 backdrop-blur xl:hidden">
        <div className="grid grid-cols-5 gap-1">
          {navItems.slice(0, 5).map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 rounded-xl py-2 text-[11px] font-medium",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted",
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="truncate">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
