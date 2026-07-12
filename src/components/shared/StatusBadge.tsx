import { cn } from "@/lib/utils";
import { STATUS_COLORS } from "@/lib/constants";

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize",
        STATUS_COLORS[status] ?? "bg-muted text-muted-foreground border-border"
      )}
    >
      {status.replace("_", " ")}
    </span>
  );
}