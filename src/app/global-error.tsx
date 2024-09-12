"use client";

import Stack from "@/components/ui/stack";
import Error from "@/components/error";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <Stack
      className="h-screen"
      direction="vertical"
      spacing="huge"
      justify="center"
      align="center"
    >
      <Error error={error} reset={reset} />
    </Stack>
  );
}
