import { db } from "../src/db/index";
import { waitlist } from "../src/db/schema";

async function main(): Promise<void> {
  const rows = await db.select().from(waitlist);
  console.log("rows in table:", rows.length);
  for (const r of rows) {
    console.log(r.id, r.email, r.createdAt?.toISOString());
  }
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
