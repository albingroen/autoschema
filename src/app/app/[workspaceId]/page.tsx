import CreateSchema from "@/components/create-schema";
import { Card } from "@/components/ui/card";
import Stack from "@/components/ui/stack";
import {
  TypographyH1,
  TypographyH2,
  TypographyH4,
  TypographyP,
} from "@/components/ui/typography";
import { verifySession } from "@/lib/dal";
import db from "@/lib/prisma";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { workspaceId: string };
}) {
  const session = await verifySession();

  const workspace = await db.workspace.findUnique({
    where: {
      users: { some: { id: session.userId } },
      id: params.workspaceId,
    },
    include: { schemas: true },
  });

  return (
    <Stack
      spacing="huge"
      direction="vertical"
      className="max-w-screen-md mx-auto"
    >
      <nav className="py-4"></nav>

      <Stack direction="vertical">
        <Link href="/app" className="link">
          {"<-"} My workspaces
        </Link>

        <TypographyH1>{workspace?.name}</TypographyH1>
      </Stack>

      <Stack direction="vertical" spacing="large">
        <Stack align="center" justify="between">
          <TypographyH2 className="text-muted-foreground">Schemas</TypographyH2>

          {workspace && <CreateSchema workspaceId={workspace.id} />}
        </Stack>

        {workspace?.schemas.length ? (
          <div className="grid grid-cols-2 gap-6">
            {workspace?.schemas.map((schema) => (
              <Link href={`/app/${schema.id}`} key={schema.id}>
                <Card className="p-3 hover:bg-muted group transition">
                  <TypographyH4 className="font-medium">
                    {schema.name}
                  </TypographyH4>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <Card className="p-5">
            <TypographyP className="text-center text-muted-foreground">
              There doesn&apos;t seem to be any schemas here.
            </TypographyP>
          </Card>
        )}
      </Stack>
    </Stack>
  );
}
