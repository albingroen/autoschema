import { Card } from "@/components/ui/card";
import { TypographyH4, TypographyP } from "@/components/ui/typography";
import { verifySession } from "@/lib/dal";
import db from "@/lib/prisma";
import Link from "next/link";
import { format, formatDistanceToNow } from "date-fns";
import Stack from "@/components/ui/stack";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

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
              <TypographyH4 className="font-medium">{schema.name}</TypographyH4>

              {schema.createdAt && (
                <TypographyP className="text-muted-foreground text-sm line-clamp-1">
                  Created {format(schema.createdAt, "MMMM dd")}
                  {schema.updatedAt && schema.updatedAt !== schema.createdAt
                    ? ` · Updated ${formatDistanceToNow(schema.updatedAt)}`
                    : ""}
                </TypographyP>
              )}
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
