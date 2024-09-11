import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Stack from "@/components/ui/stack";
import Link from "next/link";

export default function Page() {
  return (
    <Stack align="center" justify="center" className="h-screen">
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>Magic link sent!</CardTitle>
          <CardDescription>
            Check your email for the magic link to sign up. If you don&apos;t
            see it, check your spam folder.
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <Link
            className={buttonVariants({ variant: "secondary" })}
            href="/signup"
          >
            Try again
          </Link>
        </CardFooter>
      </Card>
    </Stack>
  );
}
