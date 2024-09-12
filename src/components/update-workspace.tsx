"use client";

import { updateWorkspace } from "@/actions/workspace";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Input } from "./ui/input";
import { Workspace } from "@prisma/client";
import { useFormState } from "react-dom";
import { TypographyError } from "./ui/typography";
import Stack from "./ui/stack";

const initialState = { error: "" };

export default function UpdateWorkspace(props: { workspace: Workspace }) {
  const updateWorkspaceWithWorkspaceId = updateWorkspace.bind(
    null,
    props.workspace.id,
  );

  const [state, formAction] = useFormState(
    updateWorkspaceWithWorkspaceId,
    initialState,
  );

  return (
    <form action={formAction}>
      <Card>
        <CardHeader>
          <CardTitle>Workspace name</CardTitle>
        </CardHeader>

        <CardContent>
          <Input
            required
            name="name"
            minLength={1}
            defaultValue={props.workspace.name}
            placeholder="Janes's workspace"
          />
        </CardContent>

        <CardFooter>
          <Stack align="start" spacing="large" direction="vertical">
            {state?.error && <TypographyError>{state.error}</TypographyError>}

            <Button>Save</Button>
          </Stack>
        </CardFooter>
      </Card>
    </form>
  );
}
