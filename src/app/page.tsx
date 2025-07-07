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
      <div>
        <Link href="/item/111">상품 111의 페이지로 이동</Link>
      </div>
    </div>
  );
}
