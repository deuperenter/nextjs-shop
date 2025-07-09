"use client";
import Link from "next/link";
import ProductRating from "../../common/ProductRating";
import PercentageBar from "../../common/PercentageBar";
import ProductDetailCSS from "./ProductDetail.module.css";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { usePathname, useSearchParams } from "next/navigation";
import { refArray } from "@/lib/utils";

const ProductDetail = ({
  pName,
  seller,
  ratingScore,
  totalRating,
  rating,
}: {
  pImgs: string[];
  pVideo: string[] | undefined;
  pVideoThumb: string[] | undefined;
  pName: string;
  seller: string;
  ratingScore: number;
  pId: string;
  totalRating: number;
  rating: { [k: string | number]: number };
}) => {
  const [showRating, setShowRating] = useState(false);
  const ratingRef = useRef<(HTMLElement | null)[]>([]);

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fullUrl = pathname + "?" + searchParams.toString();

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!ratingRef.current.some((c) => c === e.target)) {
        setShowRating(false);
      }
    });
  }, []);

  return (
    <div>
      <div className="font24">{pName}</div>
      <p>
        <Link href={`/seller/${seller}`}>{seller}의 다른 상품 보기</Link>
      </p>
      <div className={ProductDetailCSS.ratingNReviews}>
        <div>
          <button
            onClick={() => setShowRating(!showRating)}
            className={ProductDetailCSS.starCover}
            ref={(el) => refArray<Element>(el, ratingRef)}
          ></button>
          <span ref={(el) => refArray<Element>(el, ratingRef)}>
            {ratingScore}&nbsp;
          </span>
          <span>
            <ProductRating readonly initialValue={ratingScore} />
          </span>
        </div>
        <Link href={`${fullUrl}#reviewSection`}>{totalRating}개의 리뷰</Link>
      </div>

      <div
        className={`${
          showRating
            ? ProductDetailCSS.ratingHover
            : ProductDetailCSS.ratingHide
        } round8 borderDark`}
        ref={(el) => refArray<Element>(el, ratingRef)}
      >
        <div ref={(el) => refArray<Element>(el, ratingRef)}>
          {[5, 4, 3, 2, 1].map((i) => (
            <div
              key={`rating${i}`}
              className={ProductDetailCSS.ratingList}
              ref={(el) => refArray<Element>(el, ratingRef)}
            >
              {i}점:
              <PercentageBar
                percentage={(rating[i] / totalRating) * 100}
                ref={(el: HTMLElement) => refArray<Element>(el, ratingRef)}
              />
              <span ref={(el) => refArray<Element>(el, ratingRef)}>
                {(rating[i] / totalRating) * 100}%
              </span>
            </div>
          ))}
        </div>
        <button
          className={ProductDetailCSS.ratingClose}
          onClick={() => setShowRating(false)}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
