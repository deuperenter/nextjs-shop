import { delay, makeError } from "@/lib/test";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ pid: string; rid: string }> }
) {
  const { pid, rid } = await params;

  // DB에 정보를 업데이트하기
  delay(1000);

  return Response.json({ success: "true" });
}
