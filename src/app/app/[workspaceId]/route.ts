import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  redirect(req.nextUrl.pathname + "/schemas");
}
