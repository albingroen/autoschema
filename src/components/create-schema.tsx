"use client";

import { createSchema } from "@/actions/schema";
import { useFormState } from "react-dom";
import { Button } from "./ui/button";
import Stack from "./ui/stack";
import { TypographyError } from "./ui/typography";

const initialState = { error: "" };

export default function CreateSchema(props: { workspaceId: string }) {
  const createSchemaWithWorkspaceId = createSchema.bind(
    null,
    props.workspaceId,
  );

  const [state, formAction] = useFormState(
    createSchemaWithWorkspaceId,
    initialState,
  );

  return (
    <Stack align="center" spacing="huge">
      {state?.error && (
        <TypographyError className="text-base">{state.error}</TypographyError>
      )}

      <form action={formAction}>
        <Button>New schema</Button>
      </form>
    </Stack>
  );
}
