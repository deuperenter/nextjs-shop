import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ pid: string; rid: string }> }
) {
  const { pid, rid } = await params;

  return Response.json({ success: "true", data: { pid, rid } });
}
