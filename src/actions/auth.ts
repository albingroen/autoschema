"use server";

import db from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function completeSignup(
  token: string,
  _prevState: unknown,
  values: FormData,
) {
  const name = values.get("name") as string;

  const magicToken = await db.magicToken.findUnique({
    where: { token },
  });

  if (!magicToken || magicToken?.used) {
    return { error: "Failed to sign up" };
  }

  const user = await db.user.create({
    data: {
      name,
      email: magicToken.email,
      workspaces: {
        create: {
          name: `${name}'s workspace`,
        },
      },
    },
  });

  if (!user) {
    return { error: "Failed to sign up" };
  }

  await createSession(user.id);

  await db.magicToken.update({
    where: { token: magicToken.token },
    data: { used: true },
  });

  redirect("/app");
}
