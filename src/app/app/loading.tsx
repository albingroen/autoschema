import { Skeleton } from "@/components/ui/skeleton";
import Stack from "@/components/ui/stack";

export default function Loading() {
  return (
    <Stack direction="vertical" spacing="huge">
      <Skeleton className="h-11" />

      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
      </div>
    </Stack>
  );
}
