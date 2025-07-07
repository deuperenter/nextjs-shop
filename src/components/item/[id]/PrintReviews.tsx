"use client";
import PrintRating from "@/components/common/PrintRating";
import { Reviews } from "@/types/receivedData";
import Image from "next/image";
import Link from "next/link";
import PrintReviewsCSS from "./PrintReviews.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLandMineOn, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import RoundCSS from "../../common/round.module.css";
import ReportModal from "../../common/ReportModal";
import { useState } from "react";
import { postData } from "@/lib/handleData";
import { useAppDispatch } from "@/lib/store";
import { changeAlert } from "@/lib/features/alert/alertSlice";
import { ALERT_FAILED } from "@/lib/utils";

// 도움이 됨 버튼 isLoading, pending, suspend 등등 작업할 것

const PrintReviews = ({ reviews, pId }: { reviews: Reviews; pId: string }) => {
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
            <div className={PrintReviewsCSS.profile}>
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
              <PrintRating initialValue={rating} readonly />
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
            <p className={RoundCSS.helpfulNReport}>
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
                className={`${RoundCSS.round} ${
                  usefuls[i] ? RoundCSS.bgGreen : RoundCSS.borderDark
                }`}
              >
                <FontAwesomeIcon icon={faThumbsUp} />
                도움이 됨
              </button>
              <button
                onClick={async () => {
                  setModal(rId);
                }}
                className={`${RoundCSS.round} ${RoundCSS.bgRed}`}
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

export default PrintReviews;
