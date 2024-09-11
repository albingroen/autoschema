import db from "@/lib/prisma";
import { createSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: { token: string } },
) {
  const magicToken = await db.magicToken.findUnique({
    where: { token: params.token },
  });

  if (!magicToken || magicToken?.used) {
    return new Response(
      "This magic link seems to not exist or have already been used.",
      { status: 401, statusText: "Unauthorized" },
    );
  }

  let user = await db.user.findUnique({
    where: { email: magicToken.email },
  });

  if (!user) {
    user = await db.user.create({
      data: {
        email: magicToken.email,
        name: magicToken.name || "Unknown",
        workspaces: {
          create: {
            name: `${magicToken.name}'s workspace`,
          },
        },
      },
    });
  }

  if (!user) {
    return new Response(
      "We couldn't create an account for you. Please try again later.",
      { status: 500 },
    );
  }

  await createSession(user.id);

  await db.magicToken.update({
    where: { token: params.token },
    data: { used: true },
  });

  redirect("/app");
}
