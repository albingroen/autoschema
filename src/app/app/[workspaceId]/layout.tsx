import CreateSchema from "@/components/create-schema";
import Stack from "@/components/ui/stack";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { verifySession } from "@/lib/dal";
import db from "@/lib/prisma";
import { BoxIcon, SettingsIcon, UsersIcon } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

export default async function Layout(props: {
  children: ReactNode;
  params: { workspaceId: string };
}) {
  const session = await verifySession();

  const workspace = await db.workspace.findUnique({
    where: {
      users: { some: { id: session.userId } },
      id: props.params.workspaceId,
    },
  });

  return (
    <Stack direction="vertical" className="gap-8">
      <Stack align="center" justify="between">
        <TypographyH1>{workspace?.name}</TypographyH1>

        {props.params.workspaceId && (
          <CreateSchema workspaceId={props.params.workspaceId} />
        )}
      </Stack>

      <Stack className="gap-10">
        <ul className="flex-1 max-w-36 flex flex-col gap-3">
          <li>
            <Stack align="center">
              <BoxIcon size={20} />
              <TypographyP className="font-medium">Schemas</TypographyP>
            </Stack>
          </li>
          <li>
            <Link href="#" className="group">
              <Stack align="center">
                <UsersIcon
                  size={20}
                  className="stroke-muted-foreground group-hover:stroke-foreground transition"
                />
                <TypographyP className="text-muted-foreground group-hover:text-foreground transition">
                  Members
                </TypographyP>
              </Stack>
            </Link>
          </li>
          <li>
            <Link href="#" className="group">
              <Stack align="center">
                <SettingsIcon
                  size={20}
                  className="stroke-muted-foreground group-hover:stroke-foreground transition"
                />
                <TypographyP className="text-muted-foreground group-hover:text-foreground transition">
                  Settings
                </TypographyP>
              </Stack>
            </Link>
          </li>
        </ul>

        <div className="flex-1">{props.children}</div>
      </Stack>
    </Stack>
  );
}
