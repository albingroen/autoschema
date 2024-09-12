import { destroySession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function GET() {
  destroySession();

  redirect("/login");
}
