import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Stack from "@/components/ui/stack";
import { TypographyH4, TypographyP } from "@/components/ui/typography";
import { verifySession } from "@/lib/dal";
import db from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import { SearchIcon } from "lucide-react";
import Link from "next/link";

export default async function Page(props: { params: { workspaceId: string } }) {
  const session = await verifySession();

  const schemas = await db.schema.findMany({
    where: {
      workspace: {
        users: { some: { id: session.userId } },
        id: props.params.workspaceId,
      },
    },
  });

  return schemas.length ? (
    <Stack direction="vertical" spacing="huge" align="start">
      <Input icon={SearchIcon} placeholder="Search" />

      <div className="grid grid-cols-3 gap-4 w-full">
        {schemas.map((schema) => (
          <Link href={`/app/${schema.id}`} key={schema.id}>
            <Card className="p-3 hover:bg-muted group transition">
              <Stack direction="vertical" spacing="px">
                <TypographyH4 className="font-medium">
                  {schema.name}
                </TypographyH4>

                {schema.updatedAt && (
                  <TypographyP className="text-muted-foreground text-sm line-clamp-1">
                    Updated{" "}
                    {formatDistanceToNow(schema.updatedAt, { addSuffix: true })}
                    `
                  </TypographyP>
                )}
              </Stack>
            </Card>
          </Link>
        ))}
      </div>
    </Stack>
  ) : (
    <Card className="p-5">
      <TypographyP className="text-center text-muted-foreground">
        There doesn&apos;t seem to be any schemas here yet.
      </TypographyP>
    </Card>
  );
}
