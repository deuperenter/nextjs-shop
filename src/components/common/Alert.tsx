"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AlertCSS from "./Alert.module.css";
import {
  faCircleCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { changeAlert } from "@/lib/features/alert/alertSlice";
import { useEffect } from "react";
import { hideScroll, showScroll } from "@/lib/utils";

const Alert = () => {
  const msg = useAppSelector((state) => state.alert.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    hideScroll(msg.length !== 0);
    return showScroll;
  }, [msg]);

  return (
    <>
      {msg.length !== 0 && (
        <div className={AlertCSS.alertBkg}>
          <div className={AlertCSS.alertLayout}>
            <div className={`${AlertCSS.alertWindow} round16`}>
              {msg.length === 2 ? (
                <>
                  <FontAwesomeIcon
                    icon={faCircleExclamation}
                    className={`${AlertCSS.alertIcon} ${AlertCSS.alertError}`}
                  />
                  <div className={AlertCSS.alertMsg}>
                    <div>{msg[0]}</div>
                    <div>{msg[1]}</div>
                  </div>
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className={AlertCSS.alertIcon}
                  />
                  <div className={AlertCSS.alertMsg}>
                    <div>{msg[0]}</div>
                  </div>
                </>
              )}
              <div>
                <button
                  onClick={() => dispatch(changeAlert([]))}
                  className={`${AlertCSS.alertBtn} font20 fontLight bold round8 bgDark`}
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Alert;
