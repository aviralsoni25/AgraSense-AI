import type { ReactNode } from "react";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-[1600px]">
        <Sidebar />
        <div className="min-h-screen flex-1 xl:pb-0 pb-20">
          <Topbar />
          <main className="mx-auto w-full max-w-[1400px] p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
