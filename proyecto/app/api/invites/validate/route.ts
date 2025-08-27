import { NextResponse } from "next/server";
import { validateInvite } from "../../../../src/lib/firestore-repos";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id requerido" }, { status: 400 });
  const invite = await validateInvite(id);
  if (!invite) return NextResponse.json({ valid: false });
  return NextResponse.json({ valid: true, invite });
}
