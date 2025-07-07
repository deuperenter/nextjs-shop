"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AlertCSS from "./Alert.module.css";
import RoundCSS from "./round.module.css";
import {
  faCircleCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { changeAlert } from "@/lib/features/alert/alertSlice";
import { useEffect } from "react";

const Alert = () => {
  const msg = useAppSelector((state) => state.alert.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const main = document.querySelector("main");
    const nav = document.querySelector("nav div");
    const footer = document.querySelector("footer div");

    if (msg.length !== 0) {
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
    }

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
  }, [msg]);

  return (
    <>
      {msg.length !== 0 && (
        <div className={AlertCSS.alertBkg}>
          <div className={AlertCSS.alertLayout}>
            <div className={`${AlertCSS.alertWindow} ${RoundCSS.round16}`}>
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
                  className={`${AlertCSS.alertBtn} ${"font20"} ${
                    RoundCSS.fontLight
                  } ${RoundCSS.bold} ${RoundCSS.round} ${RoundCSS.bgDark}`}
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
