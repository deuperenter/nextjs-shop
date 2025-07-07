import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ pid: string; rid: string }> }
) {
  const { pid, rid } = await params;
  const res = await req.formData();
  const formdatas = res.get("reportContent");

  return Response.json({ success: "true", got: [pid, rid, formdatas] });
}
