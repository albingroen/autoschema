"use client";

import { deleteWorkspace } from "@/actions/workspace";
import { useFormState } from "react-dom";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { toast } from "sonner";

const initialState = { error: "" };

export default function DeleteWorkspaceButton(props: { workspaceId: string }) {
  const deleteWorkspaceWithWorkspaceId = deleteWorkspace.bind(
    null,
    props.workspaceId,
  );

  const [state, formAction] = useFormState(
    deleteWorkspaceWithWorkspaceId,
    initialState,
  );

  //useEffect(() => {
  //  if (typeof state.error === "string") {
  //    toast.error(state.error);
  //  }
  //}, [state.error]);

  return (
    <form action={formAction}>
      <Button variant="destructive">Yes, delete</Button>
    </form>
  );
}
