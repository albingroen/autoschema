"use server";

import { verifySession } from "@/lib/dal";
import { AppError } from "@/lib/error";
import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateWorkspace(
  workspaceId: string,
  _prevState: unknown,
  values: FormData,
) {
  const session = await verifySession();

  const workspace = await db.workspace.findFirst({
    where: {
      id: workspaceId,
      users: {
        some: {
          id: session.userId,
        },
      },
    },
  });

  if (!workspace) {
    return { error: AppError.UNAUTHORIZED };
  }

  const name = values.get("name") as string;

  if (name === workspace.name) {
    return;
  }

  await db.workspace.update({
    where: { id: workspace.id },
    data: { name },
  });

  revalidatePath(`/app/${workspace.id}/settings`);
}

export async function deleteWorkspace(workspaceId: string) {
  try {
    const session = await verifySession();

    const workspace = await db.workspace.findFirst({
      where: {
        id: workspaceId,
        users: {
          some: {
            id: session.userId,
          },
        },
      },
    });

    if (!workspace) {
      return { error: AppError.UNAUTHORIZED };
    }

    await db.workspace.delete({
      where: {
        id: workspace.id,
      },
    });

    redirect("/app");
  } catch {
    return { error: AppError.DELETE_WORKSPACE };
  }
}
