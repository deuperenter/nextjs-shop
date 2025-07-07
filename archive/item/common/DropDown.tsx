"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RoundCSS from "./round.module.css";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";

const DropDown = () => {
  const optionRef = useRef(null);
  const optionsRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [display, setDisplay] = useState("none");

  useEffect(() => {
    setHeight(1);
    setDisplay("block");
  }, []);

  return (
    <>
      <div
        className={`${RoundCSS.dropDown} ${RoundCSS.width80} ${RoundCSS.borderDark} ${RoundCSS.round} ${RoundCSS.bgLight} `}
      >
        <div>수량: 1</div>
        <FontAwesomeIcon icon={faCaretDown} />
      </div>
      <div
        ref={optionsRef}
        className={`${RoundCSS.options} ${RoundCSS.width100} ${RoundCSS.borderDark} ${RoundCSS.round} `}
        style={{
          height:
            height > 0 ? optionRef.current.offsetHeight * 5 : "fit-content",
          zIndex: 4,
        }}
      >
        <div
          ref={optionsRef}
          className={`${RoundCSS.options} ${RoundCSS.width100} `}
          style={{
            height:
              height > 0 ? optionRef.current.offsetHeight * 5 : "fit-content",
          }}
        ></div>
        <div ref={optionRef} className={`${RoundCSS.option}`}>
          1
        </div>
        <div className={`${RoundCSS.option}`}>1</div>
        <div className={`${RoundCSS.option}`}>1</div>
        <div className={`${RoundCSS.option}`}>1</div>
        <div className={`${RoundCSS.option}`}>1</div>
        <div className={`${RoundCSS.option}`}>1</div>
        <div className={`${RoundCSS.option}`}>1</div>
        <div className={`${RoundCSS.option}`}>1</div>
        <div className={`${RoundCSS.option}`}>1</div>
        <div className={`${RoundCSS.option}`}>1</div>
        <div className={`${RoundCSS.option}`}>1</div>
      </div>
    </>
  );
};

export default DropDown;
