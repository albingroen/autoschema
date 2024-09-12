import DeleteWorkspace from "@/components/delete-workspace";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
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
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {workspace.name}?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            workspace and remove your schemas in this workspace.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Link
            href={backLink}
            className={buttonVariants({ variant: "outline" })}
          >
            Cancel
          </Link>
          <DeleteWorkspace workspaceId={workspace.id} />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
