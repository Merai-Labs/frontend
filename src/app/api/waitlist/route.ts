import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/db";
import { waitlist } from "@/db/schema";

const bodySchema = z.object({
  email: z.string().trim().toLowerCase().email().max(255),
});

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  }

  const inserted = await db
    .insert(waitlist)
    .values({ email: parsed.data.email })
    .onConflictDoNothing()
    .returning({ id: waitlist.id });

  return NextResponse.json({ ok: true, duplicate: inserted.length === 0 }, { status: 200 });
}
