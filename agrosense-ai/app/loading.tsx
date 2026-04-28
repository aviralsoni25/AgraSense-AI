import { LoadingSkeleton } from "@/components/loading";

export default function GlobalLoading() {
  return (
    <main className="mx-auto w-full max-w-[1400px] p-6">
      <LoadingSkeleton />
    </main>
  );
}
