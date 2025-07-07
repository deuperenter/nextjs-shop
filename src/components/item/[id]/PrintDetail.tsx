"use client";
import Link from "next/link";
import PrintRating from "../../common/PrintRating";
import PercentageBar from "../../common/PercentageBar";
import PrintDetailCSS from "./PrintDetail.module.css";
import RoundCSS from "../../common/round.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { usePathname, useSearchParams } from "next/navigation";

const PrintDetail = ({
  pName,
  seller,
  ratingScore,
  pId,
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

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fullUrl = pathname + "?" + searchParams.toString();

  return (
    <div>
      <div className="font24">{pName}</div>
      <p>
        <Link href={`/seller/${seller}`}>{seller}의 다른 상품 보기</Link>
      </p>
      <div className={PrintDetailCSS.ratingNReviews}>
        <div onClick={() => setShowRating(!showRating)}>
          <span>{ratingScore}&nbsp;</span>
          <span>
            <PrintRating readonly initialValue={ratingScore} />
          </span>
        </div>
        <Link href={`${fullUrl}#reviewSection`}>{totalRating}개의 리뷰</Link>
      </div>

      <div
        className={`${
          showRating ? PrintDetailCSS.ratingHover : PrintDetailCSS.ratingHide
        } ${RoundCSS.round} ${RoundCSS.borderDark}`}
      >
        <div>
          {[5, 4, 3, 2, 1].map((i) => (
            <div key={`rating${i}`} className={PrintDetailCSS.ratingList}>
              {i}점:
              <PercentageBar percentage={(rating[i] / totalRating) * 100} />
              <span>{(rating[i] / totalRating) * 100}%</span>
            </div>
          ))}
        </div>
        <button
          className={PrintDetailCSS.ratingClose}
          onClick={() => setShowRating(false)}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    </div>
  );
};

export default PrintDetail;
