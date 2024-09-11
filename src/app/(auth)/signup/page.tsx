import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Stack from "@/components/ui/stack";
import db from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Resend } from "resend";

export default function Signup() {
  async function onSubmit(values: FormData) {
    "use server";

    const resend = new Resend(process.env.RESEND_API_KEY);

    const email = values.get("email") as string;
    const name = values.get("name") as string;

    const magicToken = await db.magicToken.create({
      data: { email, name },
    });

    await resend.emails.send({
      from: "Prisma Builder <hello@percent1.io>",
      text: `Hey! Here's your magic link: http://localhost:3000/signup/${magicToken.token}`,
      html: `Hey! Here's your magic link: <a href="http://localhost:3000/signup/${magicToken.token}">Sign in to Prisma Schema Builder</a>`,
      subject: "Your magic link",
      to: email,
    });

    redirect("/signup/wait");
  }

  return (
    <Stack align="center" justify="center" className="h-screen">
      <form action={onSubmit} className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Sign up</CardTitle>
            <CardDescription>
              Continue to sharing and collaborating on schemas by creating your
              account below.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Stack direction="vertical" spacing="huge">
              <Stack direction="vertical" spacing="large">
                <Input
                  required
                  autoFocus
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="jane.doe@email.com"
                />

                <Input
                  required
                  id="name"
                  name="name"
                  type="name"
                  label="Name"
                  placeholder="Jane Doe"
                />
              </Stack>

              <Stack align="center">
                <Checkbox id="terms" />
                <Label className="text-sm" htmlFor="terms">
                  I accept the terms & conditions
                </Label>
              </Stack>
            </Stack>
          </CardContent>

          <CardFooter>
            <Stack direction="vertical" className="w-full" spacing="small">
              <Button>Send magic link {"->"}</Button>

              <Link
                href="/login"
                className={buttonVariants({ variant: "link" })}
              >
                Already have an account? Sign in here
              </Link>
            </Stack>
          </CardFooter>
        </Card>
      </form>
    </Stack>
  );
}
