"use client";

import Stack from "@/components/ui/stack";
import { TypographyError, TypographyP } from "@/components/ui/typography";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
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
      <TypographyError className="text-base max-w-md text-balance text-center">
        {error?.message || "Something went wrong. Please try again later."}
      </TypographyError>

      <Button onClick={reset}>&larr; Go back</Button>

      <TypographyP className="text-muted-foreground text-sm">
        Need help?{" "}
        <Link className="hover:underline" href="/app/logout">
          support@autoschema.io
        </Link>
      </TypographyP>
    </Stack>
  );
}
