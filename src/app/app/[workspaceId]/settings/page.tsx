import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Stack from "@/components/ui/stack";
import { TypographyH2 } from "@/components/ui/typography";
import UpdateWorkspace from "@/components/update-workspace";
import { verifySession } from "@/lib/dal";
import db from "@/lib/prisma";
import Link from "next/link";
import { ReactNode } from "react";

export default async function Page(props: {
  children: ReactNode;
  params: { workspaceId: string };
}) {
  const session = await verifySession();

  await new Promise((res) =>
    setTimeout(() => {
      res(true);
    }, 2000),
  );

  const workspace = await db.workspace.findUnique({
    where: {
      id: props.params.workspaceId,
      users: {
        some: {
          id: session.userId,
        },
      },
    },
  });

  if (!workspace) {
    return null;
  }

  return (
    <>
      <Stack direction="vertical" spacing="huge">
        <TypographyH2>Settings</TypographyH2>

        <UpdateWorkspace workspace={workspace} />

        <form action="">
          <Card>
            <CardHeader>
              <CardTitle>Delete workspace</CardTitle>

              <CardDescription>
                Delete this workspace and all its schemas.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Link
                href={`/app/${workspace.id}/settings/delete-workspace`}
                className={buttonVariants({ variant: "destructive" })}
              >
                Delete workspace
              </Link>
            </CardContent>
          </Card>
        </form>
      </Stack>

      {props.children}
    </>
  );
}
