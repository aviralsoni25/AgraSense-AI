import { cn } from "@/lib/utils";

type VoiceWaveProps = {
  active: boolean;
};

export function VoiceWave({ active }: VoiceWaveProps) {
  return (
    <div className="flex h-14 items-end justify-center gap-1.5">
      {Array.from({ length: 8 }).map((_, index) => (
        <span
          key={index}
          className={cn(
            "w-1.5 rounded-full bg-primary/60",
            active ? "animate-[wave_0.9s_ease-in-out_infinite]" : "h-2",
          )}
          style={{
            height: active ? `${14 + ((index * 7) % 32)}px` : "6px",
            animationDelay: `${index * 80}ms`,
          }}
        />
      ))}
    </div>
  );
}
