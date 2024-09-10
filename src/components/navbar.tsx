import { Avatar, AvatarFallback } from "./ui/avatar";
import Link from "next/link";
import Stack from "./ui/stack";
import { verifySession } from "@/lib/dal";
import db from "@/lib/prisma";

export default async function Navbar() {
  const session = await verifySession();

  const user = await db.user.findUnique({
    where: { id: session.userId },
  });

  return (
    <Stack align="center" justify="between" className="py-6">
      <Link href="/">Home</Link>

      <Stack align="center">
        <Link href="/app/logout" className="link">
          Sign out
        </Link>

        <Avatar>
          <AvatarFallback>{user?.name[0]}</AvatarFallback>
        </Avatar>
      </Stack>
    </Stack>
  );
}
