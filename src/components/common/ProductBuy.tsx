"use client";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import ProductBuyCSS from "./ProductBuy.module.css";

// 쿠팡
// 바로구매: direct/checkout
// 장바구니와 구매 cartView, cart/checkout

const ProductBuy = ({ buy }: { buy: string | number }) => {
  const { id } = useParams();
  const searchParam = useSearchParams();
  const opt = searchParam.get("opt");

  return (
    <>
      <div className={ProductBuyCSS.Btns}>
        <button className="round8 bgOrange font20">장바구니에 추가</button>
        <button className="round8 bgGreen font20">
          <Link
            href={`/checkout/direct?id=${id}${
              opt ? "&opt=" + opt : ""
            }&stock=${buy}`}
          >
            지금구매
          </Link>
        </button>
      </div>
    </>
  );
};

export default ProductBuy;
