export function LoadingSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-7 w-44 animate-pulse rounded-lg bg-muted" />
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-28 animate-pulse rounded-2xl bg-muted" />
        ))}
      </div>
      <div className="h-72 animate-pulse rounded-2xl bg-muted" />
    </div>
  );
}

export function TypingDots() {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 3 }).map((_, index) => (
        <span
          key={index}
          className="h-2 w-2 animate-bounce rounded-full bg-primary"
          style={{ animationDelay: `${index * 100}ms` }}
        />
      ))}
    </div>
  );
}
