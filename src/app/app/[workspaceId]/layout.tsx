import CreateSchema from "@/components/create-schema";
import Stack from "@/components/ui/stack";
import { TypographyError, TypographyH1 } from "@/components/ui/typography";
import WorkspaceSidebar from "@/components/workspace-sidebar";
import { verifySession } from "@/lib/dal";
import db from "@/lib/prisma";
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

  if (!workspace) {
    return <TypographyError>Workspace not found</TypographyError>;
  }

  return (
    <Stack direction="vertical" className="gap-8">
      <Stack align="center" justify="between">
        <TypographyH1>{workspace?.name}</TypographyH1>

        {props.params.workspaceId && (
          <CreateSchema workspaceId={props.params.workspaceId} />
        )}
      </Stack>

      <Stack className="gap-10">
        <WorkspaceSidebar workspaceId={props.params.workspaceId} />

        <div className="flex-1">{props.children}</div>
      </Stack>
    </Stack>
  );
}
