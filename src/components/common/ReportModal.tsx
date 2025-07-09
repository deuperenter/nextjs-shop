"use client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import ReportModalCSS from "../common/ReportModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { postData } from "@/lib/handleData";
import { useAppDispatch } from "@/lib/store";
import { changeAlert } from "@/lib/features/alert/alertSlice";
import {
  ALERT_FAILED,
  hideScroll,
  refArray,
  REPORT_SUCCESS,
  showScroll,
} from "@/lib/utils";

const ReportModal = ({
  pId,
  modal,
  setModal,
}: {
  pId: string;
  modal: string;
  setModal: Dispatch<SetStateAction<string>>;
}) => {
  const [reportContent, setReportContent] = useState("");
  const closeModalRef = useRef<(HTMLElement | null)[]>([]);
  const dispatch = useAppDispatch();

  async function reportData() {
    const formData = new FormData();
    if (reportContent && reportContent.length >= 15) {
      formData.append("reportContent", reportContent);

      const { success, got } = await postData(
        `/api/item/${pId}/${modal}/report`,
        formData
      );
      console.log(got);

      if (success) {
        console.log("신고했습니다.");
        dispatch(changeAlert(REPORT_SUCCESS));
      } else {
        console.log("오류가 발생했습니다. 관리자에게 문의해주세요");
        dispatch(changeAlert(ALERT_FAILED));
      }
      setModal("");
    } else {
    }
  }

  useEffect(() => {
    hideScroll();
    return showScroll;
  }, []);

  return (
    <>
      <div className={ReportModalCSS.modalBkg}></div>
      <div
        onClick={(e) => {
          if (!closeModalRef.current.some((c) => c === e.target)) {
            setModal("");
          }
        }}
        className={ReportModalCSS.modalLayout}
      >
        <div
          ref={(el) => refArray<Element>(el, closeModalRef)}
          className={`${ReportModalCSS.modalWindow} round16`}
        >
          <div
            ref={(el) => refArray<Element>(el, closeModalRef)}
            className={`${ReportModalCSS.modalContent}`}
          >
            <div
              ref={(el) => refArray<Element>(el, closeModalRef)}
              className={ReportModalCSS.titleNClose}
            >
              <div
                ref={(el) => refArray<Element>(el, closeModalRef)}
                className="font20"
              >
                신고하기
              </div>
              <button
                ref={(el) => refArray<Element>(el, closeModalRef)}
                onClick={() => setModal("")}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <p ref={(el) => refArray<Element>(el, closeModalRef)}>
              신고 사유를 작성해주세요(15~150자)
            </p>
            <textarea
              ref={(el) => refArray<Element>(el, closeModalRef)}
              name="report"
              id="report"
              className={ReportModalCSS.textarea}
              maxLength={150}
              value={reportContent}
              onChange={(e) => setReportContent(e.target.value)}
              placeholder="신고가 부적절한 경우 제재합니다."
            ></textarea>
            <button
              ref={(el) => refArray<Element>(el, closeModalRef)}
              onClick={reportData}
              className={`${ReportModalCSS.submitReport} round8 bgBlue fontLight`}
            >
              제출하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportModal;
