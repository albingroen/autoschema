"use client";

import { useFormState } from "react-dom";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import Stack from "./ui/stack";
import { Input } from "./ui/input";
import { completeSignup } from "@/actions/auth";
import { TypographyError } from "./ui/typography";

const initialState = { error: "" };

export default function CompleteSignupForm({ token }: { token: string }) {
  const [state, formAction] = useFormState(
    completeSignup.bind(null, token),
    initialState,
  );

  return (
    <Stack align="center" justify="center" className="h-screen">
      <form action={formAction} className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Complete signup</CardTitle>
            <CardDescription>
              Almost done! We&apos;d just like to know what to call you?
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Stack direction="vertical" className="w-full">
              <Input
                required
                autoFocus
                id="name"
                name="name"
                type="text"
                label="My name"
                placeholder="Jane Doe"
              />

              <TypographyError aria-live="polite">
                {state?.error}
              </TypographyError>
            </Stack>
          </CardContent>

          <CardFooter>
            <Button className="w-full">Continue {"->"}</Button>
          </CardFooter>
        </Card>
      </form>
    </Stack>
  );
}
