import Link from "next/link";
import Button, { NextJSButton, ReactButton } from "../components/Button";

export default function Home() {
  // return 스페이스바까지 입력한 다음에 div를 입력하고 엔터를 누른 다음 내용을 채워넣으면 됩니다.
  return (
    <div>
      <div>
        Hello test page!
        <Button />
        <ReactButton />
        <NextJSButton />
        <Link href="/items">상품 카테고리 클릭</Link>
        <Link href="/item/111">상품 상세 페이지로 이동</Link>
      </div>
    </div>
  );
}
