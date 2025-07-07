import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(":")[3];

  return Response.json({ ip });
}
