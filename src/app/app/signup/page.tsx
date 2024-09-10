import { Button } from "@/components/ui/button";
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
import { Resend } from "resend";

export default function Signup() {
  async function onSubmit(values: FormData) {
    "use server";

    const resend = new Resend(process.env.RESEND_API_KEY);

    const email = values.get("email") as string;

    const magicToken = await db.magicToken.create({
      data: { email },
    });

    resend.emails.send({
      from: "Prisma Builder <hello@percent1.io>",
      text: `Hey! Here's your magic link: http://localhost:3000/app/signup/${magicToken.token}`,
      html: `Hey! Here's your magic link: <a href="http://localhost:3000/app/signup/${magicToken.token}">Log in to Prisma Schema Builder</a>`,
      subject: "Your magic link",
      to: email,
    });
  }

  return (
    <Stack align="center" justify="center" className="h-screen">
      <form action={onSubmit} className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Sign up</CardTitle>
            <CardDescription>
              Welcome to Prisma Schema Builder. Continue to sharing and
              collaborating on schemas by creating your account below.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Stack direction="vertical" spacing="huge">
              <Input
                required
                autoFocus
                name="email"
                id="email"
                type="email"
                placeholder="Email"
              />

              <Stack align="center">
                <Checkbox id="terms" />
                <Label className="text-sm" htmlFor="terms">
                  I accept the terms & conditions
                </Label>
              </Stack>
            </Stack>
          </CardContent>

          <CardFooter>
            <Button className="w-full">Send magic link {"->"}</Button>
          </CardFooter>
        </Card>
      </form>
    </Stack>
  );
}
