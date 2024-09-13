import DeleteWorkspaceButton from "@/components/delete-workspace-button";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Stack from "@/components/ui/stack";
import { verifySession } from "@/lib/dal";
import db from "@/lib/prisma";
import Link from "next/link";

export default async function Page(props: { params: { workspaceId: string } }) {
  const session = await verifySession();

  const workspace = await db.workspace.findFirst({
    where: {
      id: props.params.workspaceId,
      users: {
        some: { id: session.userId },
      },
    },
  });

  if (!workspace) {
    return null;
  }

  const backLink = `/app/${workspace.id}/settings`;

  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle>Delete {workspace.name}?</CardTitle>
        <CardDescription>
          This action cannot be undone. This will permanently delete your
          workspace and remove your schemas in this workspace.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Stack>
          <Link
            href={backLink}
            className={buttonVariants({ variant: "outline" })}
          >
            Cancel
          </Link>
          <DeleteWorkspaceButton workspaceId={workspace.id} />
        </Stack>
      </CardFooter>
    </Card>
  );
}
