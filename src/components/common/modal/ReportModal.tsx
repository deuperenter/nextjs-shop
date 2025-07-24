"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import ReportModalCSS from "./ReportModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { postData } from "@/lib/handleData";
import { useAppDispatch } from "@/lib/hook";
import { closeModal, showModal } from "@/lib/features/modal/modalSlice";
import { ALERT_FAILED_DISPATCH, REPORT_SUCCESS_DISPATCH } from "@/lib/modal";
import { ReportType } from "@/types/modal";

const ReportModal = ({ report: { pId, rId } }: { report: ReportType }) => {
  const [reportContent, setReportContent] = useState("");
  const dispatch = useAppDispatch();

  const reportModalRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    reportModalRef.current?.focus();
  }, []);

  async function reportData(e: FormEvent) {
    e.preventDefault();
    if (!reportContent || reportContent.length < 15) {
      return;
    }
    const formData = new FormData();
    formData.append("reportContent", reportContent);

    const { success } = await postData(
      `/api/item/${pId}/${rId}/report`,
      formData
    );

    if (success) {
      dispatch(showModal(REPORT_SUCCESS_DISPATCH));
    } else {
      dispatch(showModal(ALERT_FAILED_DISPATCH));
    }
  }

  return (
    <div className={`${ReportModalCSS.modalWindow} round16`}>
      <form onSubmit={reportData} className={`${ReportModalCSS.modalContent}`}>
        <div className={ReportModalCSS.titleNClose}>
          <div className="font20">신고하기</div>
          <button onClick={() => dispatch(closeModal())}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <p>신고 사유를 작성해주세요(15~150자)</p>
        <textarea
          name="report"
          id="report"
          className={ReportModalCSS.textarea}
          maxLength={150}
          minLength={15}
          value={reportContent}
          onChange={(e) => {
            setReportContent(e.target.value);
          }}
          placeholder="신고가 부적절한 경우 제재합니다."
          ref={reportModalRef}
        ></textarea>
        <button
          className={`${ReportModalCSS.submitReport} round8 bgBlue fontLight`}
        >
          제출하기
        </button>
      </form>
    </div>
  );
};

export default ReportModal;
