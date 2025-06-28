import Button, { NextJSButton, ReactButton } from "../components/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div>Hello test page!</div>
      <Button />
      <ReactButton />
      <NextJSButton />
      <Link href="/category">상품 카테고리 클릭</Link>
    </div>
  );
}
