import db from "@/lib/prisma";
import { type NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { token: string } },
) {
  const magicToken = await db.magicToken.findUnique({
    where: {
      token: params.token,
    },
  });

  console.log(magicToken);

  return new Response("Loading...!");
}
