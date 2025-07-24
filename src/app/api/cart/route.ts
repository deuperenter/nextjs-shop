import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const opt = searchParams.get("opt");
  const stock = searchParams.get("stock");

  return Response.json({ success: true, data: { id, opt, stock } });
}
