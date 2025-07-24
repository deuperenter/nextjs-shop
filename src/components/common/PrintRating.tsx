"use client";
import { RatingData } from "@/types/receivedData";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Rating } from "react-simple-star-rating";
import PrintRatingCSS from "./PrintRating.module.css";
import PercentageBar from "./PercentageBar";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

const PrintRating = ({
  rating: { totalRating, ratingScore, scores5To1 },
}: {
  rating: RatingData;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showRating, setShowRating] = useState(false);

  let fullUrl = pathname;

  if (searchParams.size) {
    fullUrl += "?" + searchParams.toString();
  }

  return (
    <>
      <button className="normal" onClick={() => setShowRating(!showRating)}>
        {ratingScore}
        <Rating
          readonly
          allowFraction
          initialValue={Math.round(ratingScore * 2) / 2}
        />
      </button>
      <Link href={`${fullUrl}#reviewSection`}>{totalRating}개의 리뷰</Link>
      {showRating && (
        <PrintRatingWindow
          totalRating={totalRating}
          scores5To1={scores5To1}
          setShowRating={setShowRating}
        />
      )}
    </>
  );
};

const PrintRatingWindow = ({
  totalRating,
  scores5To1,
  setShowRating,
}: {
  totalRating: number;
  scores5To1: number[];
  setShowRating: Dispatch<SetStateAction<boolean>>;
}) => {
  const ratingRef = useRef<HTMLDivElement>(null);

  const closeRating = (e: MouseEvent) => {
    if (e.target instanceof Node && !ratingRef.current?.contains(e.target)) {
      setShowRating(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeRating);

    return () => {
      document.removeEventListener("click", closeRating);
    };
  }, []);

  return (
    <div
      className={`round8 borderDark bgWhite ${PrintRatingCSS.ratingWindow}`}
      ref={ratingRef}
    >
      {scores5To1.map((s, i) => (
        <div key={`score${i}`}>
          <div className={PrintRatingCSS.ratings}>
            <div>{`${5 - i}점:`}</div>
            <PercentageBar percentage={(s / totalRating) * 100} />
            <div>{(s / totalRating) * 100}%</div>
          </div>
        </div>
      ))}
      <button
        className={PrintRatingCSS.ratingClose}
        onClick={() => setShowRating(false)}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
};

export default PrintRating;
