"use client";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import ProductBuyCSS from "./ProductBuy.module.css";
import { postData } from "@/lib/handleData";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { closeModal, showModal } from "@/lib/features/modal/modalSlice";
import { useEffect } from "react";
import { ALERT_FAILED_DISPATCH, TO_CART, TO_CART_DISPATCH } from "@/lib/modal";

// 쿠팡
// 바로구매: direct/checkout
// 장바구니와 구매 cartView, cart/checkout

const ProductBuy = ({ buy }: { buy: number }) => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const opt = searchParams.get("opt");

  const dispatch = useAppDispatch();
  const router = useRouter();
  const { yes } = useAppSelector((state) => state.modal.value);

  useEffect(() => {
    if (yes === TO_CART) {
      router.push("/cart");
      dispatch(closeModal());
    }
  }, [yes]);

  return (
    <>
      <div className={ProductBuyCSS.Btns}>
        <button
          className="round8 bgOrange font20"
          onClick={async () => {
            postData(
              `/api/cart?id=${id}&${opt ? "&opt=" + opt : ""}&stock=${buy}`
            ).then(({ success, data }) => {
              if (success) {
                console.log(data);
                dispatch(showModal(TO_CART_DISPATCH));
              } else {
                dispatch(showModal(ALERT_FAILED_DISPATCH));
              }
            });
          }}
        >
          장바구니에 추가
        </button>

        <Link
          href={`/checkout/direct?id=${id}${
            opt ? "&opt=" + opt : ""
          }&stock=${buy}`}
          className="round8 bgGreen font20 linkBtn"
          draggable="false"
        >
          지금구매
        </Link>
      </div>
    </>
  );
};

export default ProductBuy;
