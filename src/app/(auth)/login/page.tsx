import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Stack from "@/components/ui/stack";
import db from "@/lib/prisma";
import { Resend } from "resend";

export default function LoginPage() {
  async function onSubmit(values: FormData) {
    "use server";

    const resend = new Resend(process.env.RESEND_API_KEY);

    const email = values.get("email") as string;

    const magicToken = await db.magicToken.create({
      data: { email },
    });

    resend.emails.send({
      from: "Prisma Builder <hello@percent1.io>",
      text: `Hey! Here's your magic link: http://localhost:3000/login/${magicToken.token}`,
      html: `Hey! Here's your magic link: <a href="http://localhost:3000/login/${magicToken.token}">Sign in to Prisma Schema Builder</a>`,
      subject: "Your magic link",
      to: email,
    });
  }

  return (
    <Stack align="center" justify="center" className="h-screen">
      <form action={onSubmit} className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>Sign in to Prisma Schema Builder</CardDescription>
          </CardHeader>

          <CardContent>
            <Input
              required
              autoFocus
              name="email"
              id="email"
              type="email"
              placeholder="Email"
            />
          </CardContent>

          <CardFooter>
            <Button className="w-full">Send magic link {"->"}</Button>
          </CardFooter>
        </Card>
      </form>
    </Stack>
  );
}
