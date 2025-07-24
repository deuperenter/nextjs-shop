"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const SearchResult = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  return (
    <div>
      <div>검색 결과 {q}</div>
      <Link href="/item/111">상품 상세 페이지로 이동</Link>
    </div>
  );
};

export default SearchResult;
