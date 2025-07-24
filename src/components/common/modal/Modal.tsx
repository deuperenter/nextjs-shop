"use client";
import Alert from "./Alert";
import ModalCSS from "./Modal.module.css";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import ReportModal from "./ReportModal";
import { closeModal } from "@/lib/features/modal/modalSlice";
import { useEffect } from "react";
import { hideScroll, showScroll } from "@/lib/modal";

const Modal = () => {
  const modal = useAppSelector((state) => state.modal.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (modal.close) {
      showScroll();
    } else {
      hideScroll();
    }
  }, [modal.close]);

  return (
    <>
      {!modal.close && (
        <div
          className={ModalCSS.modalBkg}
          onClick={(e) =>
            modal.alertMsg &&
            e.target === e.currentTarget &&
            dispatch(closeModal())
          }
        >
          {modal.alertMsg && (
            <Alert alertMsg={modal.alertMsg} confirm={modal.confirm} />
          )}
          {modal.report && <ReportModal report={modal.report} />}
        </div>
      )}
    </>
  );
};

export default Modal;
