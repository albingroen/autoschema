"use server";

import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createSchema(workspaceId: string) {
  try {
    await db.schema.create({
      data: {
        workspace: { connect: { id: workspaceId } },
        name: "New schema",
        structure: {},
      },
    });

    revalidatePath("/app");
  } catch {
    return { error: "Failed to create schema" };
  }
}
