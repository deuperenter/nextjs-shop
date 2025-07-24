import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const opt = searchParams.get("opt");
  const stock = searchParams.get("stock");

  if (!id || !stock) {
    throw new Error("에러가 발생했습니다.");
  }

  // DB에 저장하는 것을 대신합니다. 쿠키는 키 1개 당 해당하는 값에 대한 용량이 4096B로 적습니다.
  const cookieStorage = cookies();
  const cart = (await cookieStorage).get("cart")?.value;

  const cartItems: Array<{
    key: number;
    id: string;
    stock: number;
    opt?: string | null;
  }> = [];

  let cartKey = 0;

  if (cart) {
    cartItems.push(...JSON.parse(cart));
    cartKey = cartItems[cartItems.length - 1].key;
  }

  cartItems.push({ key: cartKey + 1, id: id, stock: +stock, opt: opt });

  (await cookieStorage).set("cart", JSON.stringify(cartItems));

  return Response.json({ success: true, id: id, cart: cartItems });
}
