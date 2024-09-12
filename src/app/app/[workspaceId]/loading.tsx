import { Skeleton } from "@/components/ui/skeleton";
import Stack from "@/components/ui/stack";

export default function Loading() {
  return (
    <Stack direction="vertical" spacing="huge">
      <Skeleton className="h-6 w-36" />
      <Skeleton className="h-11" />

      <Stack justify="between">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-9 w-32" />
      </Stack>

      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
        <Skeleton className="h-20" />
      </div>
    </Stack>
  );
}
