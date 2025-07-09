"use client";
import ProductRating from "@/components/common/ProductRating";
import { Reviews } from "@/types/receivedData";
import Image from "next/image";
import Link from "next/link";
import ProductReviewsCSS from "./ProductReviews.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLandMineOn, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import ReportModal from "../../common/ReportModal";
import { useState } from "react";
import { postData } from "@/lib/handleData";
import { useAppDispatch } from "@/lib/store";
import { changeAlert } from "@/lib/features/alert/alertSlice";
import { ALERT_FAILED } from "@/lib/utils";

// 도움이 됨 버튼 isLoading, pending, suspend 등등 작업할 것

const ProductReviews = ({
  reviews,
  pId,
}: {
  reviews: Reviews;
  pId: string;
}) => {
  const [modal, setModal] = useState("");

  const usefulArray = reviews.content.map((c) => c.useful);

  const [isPending, setIsPending] = useState(false);
  const [usefuls, setUsefuls] = useState(usefulArray);

  const dispatch = useAppDispatch();

  return (
    <>
      <p className="font24" key="review">
        리뷰 보기
      </p>
      {reviews.content.map((c, i) => {
        const {
          rId,
          uProfile,
          uName,
          uCtry,
          rTitle,
          rText,
          rating,
          rImgs,
          rvideo,
          rDate,
          rOptions,
          totalUseful,
          useful,
        } = c;
        return (
          <div key={rId}>
            <div className={ProductReviewsCSS.profile}>
              <Image
                src={uProfile}
                width={50}
                height={50}
                alt={`profile${i}`}
              />
              {uName}
            </div>
            <div>{rTitle}</div>
            <div>
              <ProductRating initialValue={rating} readonly />
            </div>
            <div>
              {rDate}에 {uCtry}에서 리뷰함
            </div>
            {rOptions &&
              rOptions.map((rOption, i) => {
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
            {rvideo && (
              <video width={250} height={250} controls preload="none">
                <source src={rvideo[0]} type="video/mp4" />
              </video>
            )}
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
                      dispatch(changeAlert(ALERT_FAILED));
                    }
                    setIsPending(false);
                  }
                }}
                className={`round8 ${usefuls[i] ? "bgGreen" : "borderDark"}
                }`}
              >
                <FontAwesomeIcon icon={faThumbsUp} />
                도움이 됨
              </button>
              <button
                onClick={async () => {
                  setModal(rId);
                }}
                className="round8 bgRed"
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
      {modal && <ReportModal pId={pId} modal={modal} setModal={setModal} />}
    </>
  );
};

export default ProductReviews;
