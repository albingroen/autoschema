"use client";

import Stack from "@/components/ui/stack";
import { TypographyError, TypographyP } from "@/components/ui/typography";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

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

      <Stack>
        <Button onClick={reset}>&larr; Go back</Button>

        <Button
          variant="secondary"
          onClick={() => {
            router.push("/app/logout");
          }}
        >
          Sign out
        </Button>
      </Stack>

      <TypographyP className="text-muted-foreground text-sm">
        Need help?{" "}
        <Link className="hover:underline" href="/app/logout">
          support@prismabuilder.io
        </Link>
      </TypographyP>
    </Stack>
  );
}
