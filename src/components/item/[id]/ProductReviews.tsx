"use client";
import { Reviews } from "@/types/receivedData";
import Image from "next/image";
import Link from "next/link";
import ProductReviewsCSS from "./ProductReviews.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLandMineOn, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { postData } from "@/lib/handleData";
import { useAppDispatch } from "@/lib/hook";
import { showModal } from "@/lib/features/modal/modalSlice";
import { ALERT_FAILED_DISPATCH } from "@/lib/modal";
import { Rating } from "react-simple-star-rating";

// 도움이 됨 버튼 isLoading, pending, suspend 등등 작업할 것

const ProductReviews = ({
  reviews,
  pId,
}: {
  reviews: Reviews;
  pId: string;
}) => {
  const usefulArray = reviews.contents.map((c) => c.useful);

  const [isPending, setIsPending] = useState(false);
  const [usefuls, setUsefuls] = useState(usefulArray);

  const dispatch = useAppDispatch();

  return (
    <>
      <p id="reviewSection" className="font24" key="review">
        리뷰 보기
      </p>
      {reviews.contents.map((content, i) => {
        const {
          rId,
          uProfile,
          uName,
          uCtry,
          rTitle,
          rText,
          rating,
          rImgs,
          rvideos,
          rDate,
          rOptions,
          totalUseful,
        } = content;

        return (
          <div key={rId}>
            <div className={ProductReviewsCSS.profile}>
              <Image
                src={uProfile}
                width={50}
                height={50}
                alt={`profile${uName}`}
              />
              {uName}
            </div>
            <div>{rTitle}</div>
            <div>
              <Rating
                readonly
                allowFraction
                initialValue={Math.round(rating * 2) / 2}
              />
            </div>
            <div>
              {rDate}에 {uCtry}에서 리뷰함
            </div>
            {rOptions?.map((rOption, i) => {
              for (const index in rOption) {
                return (
                  <span key={`rOption${i}`}>
                    {index}: {rOption[index]}
                    {rOptions.length - 1 === i ? "" : " | "}
                  </span>
                );
              }
            })}
            <div>{rText}</div>
            {rImgs?.map((img, i) => (
              <Image
                key={`rImage${i}`}
                alt={`reviewImg${i}`}
                src={img}
                width={250}
                height={250}
              />
            ))}
            {rvideos?.map((rvideo, i) => (
              <video key={`rvideo${i}`} width={250} height={250} controls>
                <source src={rvideo} type="video/mp4" />
              </video>
            ))}
            <p>{totalUseful}명이 유용하다고 평가함</p>
            <p className={ProductReviewsCSS.helpfulNReport}>
              <button
                onClick={async () => {
                  if (!isPending) {
                    setIsPending(true);
                    const { success } = await postData(
                      `/api/item/${pId}/${rId}/useful`
                    );
                    if (success) {
                      const usefulsCopy = [...usefuls];
                      usefulsCopy[i] = !usefulsCopy[i];
                      setUsefuls(usefulsCopy);
                      console.log("업데이트 성공!");
                    } else {
                      console.log("업데이트 실패!");
                      dispatch(showModal(ALERT_FAILED_DISPATCH));
                    }
                    setIsPending(false);
                  }
                }}
                className={`round8 btnWithIcon ${
                  usefuls[i] ? "bgGreen" : "borderDark"
                }
                }`}
              >
                <FontAwesomeIcon icon={faThumbsUp} />
                도움이 됨
              </button>
              <button
                onClick={() =>
                  dispatch(
                    showModal({ value: { report: { pId: pId, rId: rId } } })
                  )
                }
                className="round8 bgRed btnWithIcon"
              >
                <FontAwesomeIcon icon={faLandMineOn} />
                신고하기
              </button>
            </p>
          </div>
        );
      })}
      <p key="reviewLink">
        <Link href={`/reviews/${pId}`}>리뷰 더 보기</Link>
      </p>
    </>
  );
};

export default ProductReviews;
