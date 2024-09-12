import CreateSchema from "@/components/create-schema";
import { Card } from "@/components/ui/card";
import Stack from "@/components/ui/stack";
import {
  TypographyH2,
  TypographyH4,
  TypographyP,
} from "@/components/ui/typography";
import { verifySession } from "@/lib/dal";
import db from "@/lib/prisma";
import Link from "next/link";

export default async function Page(props: { params: { workspaceId: string } }) {
  const session = await verifySession();

  await new Promise((res) =>
    setTimeout(() => {
      res(true);
    }, 2000),
  );

  const schemas = await db.schema.findMany({
    where: {
      workspace: {
        users: { some: { id: session.userId } },
        id: props.params.workspaceId,
      },
    },
  });

  return schemas.length ? (
    <div className="grid grid-cols-3 gap-4">
      {schemas.map((schema) => (
        <Link href={`/app/${schema.id}`} key={schema.id}>
          <Card className="p-3 hover:bg-muted group transition">
            <TypographyH4 className="font-medium">{schema.name}</TypographyH4>
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
  );
}
