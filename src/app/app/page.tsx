import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import Stack from "@/components/ui/stack";
import {
  TypographyH1,
  TypographyH4,
  TypographyP,
} from "@/components/ui/typography";
import { verifySession } from "@/lib/dal";
import db from "@/lib/prisma";
import Link from "next/link";

export default async function Page() {
  const session = await verifySession();

  const user = await db.user.findUnique({
    where: { id: session.userId },
    include: {
      workspaces: { include: { users: { select: { _count: true } } } },
    },
  });

  return (
    <Stack direction="vertical" spacing="huge">
      <TypographyH1>My workspaces</TypographyH1>

      <div className="grid grid-cols-3 gap-4">
        {user?.workspaces.map((workspace) => (
          <Link href={`/app/${workspace.id}/schemas`} key={workspace.id}>
            <Card className="p-3 hover:bg-muted group transition">
              <Stack>
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-muted group-hover:bg-muted-darker text-xl transition">
                    {workspace.name[0]}
                  </AvatarFallback>
                </Avatar>
                <Stack direction="vertical" spacing="none">
                  <TypographyH4 className="font-medium">
                    {workspace.name}
                  </TypographyH4>
                  <TypographyP className="text-sm text-muted-foreground">
                    {workspace.users.length} member(s)
                  </TypographyP>
                </Stack>
              </Stack>
            </Card>
          </Link>
        ))}
      </div>
    </Stack>
  );
}
