"use client";
import AlertCSS from "./Alert.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { closeModal, yesModal } from "@/lib/features/modal/modalSlice";
import { useAppDispatch } from "@/lib/hook";
import { AlertMsg } from "@/types/modal";

const Alert = ({
  alertMsg,
  confirm,
}: {
  alertMsg: AlertMsg;
  confirm: string | undefined;
}) => {
  const dispatch = useAppDispatch();

  return (
    <div className={`${AlertCSS.alertWindow} round16`}>
      <FontAwesomeIcon
        icon={alertMsg.length === 3 ? faCircleExclamation : faCircleCheck}
        className={`${AlertCSS.alertIcon} ${
          alertMsg.length === 3 && AlertCSS.alertError
        }`}
      />
      <div className={AlertCSS.alertMsg}>
        <div>{alertMsg[0]}</div>
        {alertMsg.length >= 2 && <div>{alertMsg[1]}</div>}
      </div>
      <div>
        {confirm ? (
          <div className={AlertCSS.alertBtns}>
            <button
              onClick={() => {
                dispatch(yesModal(confirm));
              }}
              className={`font20 fontLight bold round8 bgDark ${AlertCSS.alertBtn}`}
            >
              확인
            </button>
            <button
              onClick={() => dispatch(closeModal())}
              className={`font20 fontLight bold round8 bgGray ${AlertCSS.alertBtn}`}
            >
              취소
            </button>
          </div>
        ) : (
          <button
            onClick={() => dispatch(closeModal())}
            className={`font20 fontLight bold round8 bgDark ${AlertCSS.alertBtn}`}
          >
            확인
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
