import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const secret = process.env["SETUP_SECRET"];
  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await sql`SELECT 1 as connected`;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown";
    return NextResponse.json({ error: "DB connection failed", detail: message }, { status: 500 });
  }

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS transformer_runs (
        id              TEXT PRIMARY KEY,
        created_at      TIMESTAMP DEFAULT NOW(),
        gpu_name        TEXT NOT NULL,
        gpu_vendor      TEXT NOT NULL DEFAULT '',
        gpu_arch        TEXT NOT NULL DEFAULT '',
        browser         TEXT NOT NULL DEFAULT '',
        os              TEXT NOT NULL DEFAULT '',
        config          TEXT DEFAULT '',
        layers          INT DEFAULT 0,
        d_model         INT DEFAULT 0,
        dispatches      INT DEFAULT 0,
        unfused_ms      REAL,
        fused_1t_ms     REAL,
        parallel_ms     REAL,
        speedup_1t      REAL,
        speedup_parallel REAL,
        speedup_pytorch REAL,
        tokens_per_sec  REAL,
        screen_width    INT DEFAULT 0,
        screen_height   INT DEFAULT 0,
        is_mobile       BOOLEAN DEFAULT false
      )
    `;

    return NextResponse.json({ ok: true, message: "Table created" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown";
    return NextResponse.json({ error: "Table creation failed", detail: message }, { status: 500 });
  }
}
