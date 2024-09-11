import { Avatar, AvatarFallback } from "./ui/avatar";
import Link from "next/link";
import Stack from "./ui/stack";
import { verifySession } from "@/lib/dal";
import db from "@/lib/prisma";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HouseIcon } from "lucide-react";

export default async function Navbar() {
  const session = await verifySession();

  const user = await db.user.findUnique({
    where: { id: session.userId },
  });

  return (
    <Stack align="center" justify="between" className="py-6">
      <Link href="/app" className="group">
        <HouseIcon className="w-6 stroke-muted-foreground group-hover:stroke-foreground transition" />
      </Link>

      <Stack align="center">
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full">
            <Avatar>
              <AvatarFallback>{user?.name[0]}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href="/app/profile" passHref>
              <DropdownMenuItem>My profile</DropdownMenuItem>
            </Link>

            <Link href="/logout" passHref>
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </Stack>
    </Stack>
  );
}
