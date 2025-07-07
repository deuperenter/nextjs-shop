"use client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import ReportModalCSS from "../common/ReportModal.module.css";
import RoundCSS from "../common/round.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { postData } from "@/lib/handleData";
import { useAppDispatch } from "@/lib/store";
import { changeAlert } from "@/lib/features/alert/alertSlice";
import { ALERT_FAILED, REPORT_SUCCESS } from "@/lib/utils";

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
  const closeModalRef = useRef(null);
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
    const main = document.querySelector("main");
    const nav = document.querySelector("nav div");
    const footer = document.querySelector("footer div");

    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (main instanceof HTMLElement) {
      main.style.marginRight = `${scrollBarWidth + 30}px`;
    }

    if (nav instanceof HTMLElement) {
      nav.style.paddingRight = `${scrollBarWidth + 30}px`;
    }

    if (footer && footer instanceof HTMLElement) {
      footer.style.paddingRight = `${scrollBarWidth + 30}px`;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";

      if (main instanceof HTMLElement) {
        main.style.marginRight = `30px`;
      }

      if (nav instanceof HTMLElement) {
        nav.style.paddingRight = `30px`;
      }

      if (footer instanceof HTMLElement) {
        footer.style.paddingRight = "0px";
      }
    };
  }, []);

  return (
    <>
      <div className={ReportModalCSS.modalBkg}></div>
      <div
        onClick={(e) => {
          if (!closeModalRef.current?.contains(e.target)) {
            setModal("");
          }
        }}
        className={ReportModalCSS.modalLayout}
      >
        <div
          ref={closeModalRef}
          className={`${ReportModalCSS.modalWindow} ${RoundCSS.round16}`}
        >
          <div ref={closeModalRef} className={`${ReportModalCSS.modalContent}`}>
            <div ref={closeModalRef} className={ReportModalCSS.titleNClose}>
              <div ref={closeModalRef} className="font20">
                신고하기
              </div>
              <button ref={closeModalRef} onClick={() => setModal("")}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <p ref={closeModalRef}>신고 사유를 작성해주세요(15~150자)</p>
            <textarea
              ref={closeModalRef}
              name="report"
              id="report"
              className={ReportModalCSS.textarea}
              maxLength={150}
              value={reportContent}
              onChange={(e) => setReportContent(e.target.value)}
              placeholder="신고가 부적절한 경우 제재합니다."
            ></textarea>
            <button
              ref={closeModalRef}
              onClick={reportData}
              className={`${ReportModalCSS.submitReport} ${RoundCSS.round} ${RoundCSS.bgBlue} ${RoundCSS.fontLight}`}
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
