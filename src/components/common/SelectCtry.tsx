"use client";
import { changeCountry } from "@/lib/features/counter/countrySlice";
import { getData } from "@/lib/handleData";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { nation } from "../../../archive/item/common/testData";
import SelectCtryCSS from "./SelectCtry.module.css";
import { RefObject, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { refArray } from "@/lib/utils";

function SelectCtry({
  selectCtryRef,
}: {
  selectCtryRef: RefObject<(HTMLElement | null)[]>;
}) {
  const ctry = useAppSelector((state) => state.country.value);
  const dispatch = useAppDispatch();
  const [nationList, setNationList] = useState(false);

  useEffect(() => {
    // dispatch(fetchCategory());
    window.addEventListener("click", (e) => {
      if (!selectCtryRef.current.some((c) => c === e.target)) {
        setNationList(false);
      }
    });
  }, []);

  return (
    <>
      <div
        id="selectCtry"
        onClick={() => {
          setNationList(!nationList);
        }}
        className={`bold ${SelectCtryCSS.selectCtry}`}
        ref={(el) => refArray<HTMLElement>(el, selectCtryRef)}
      >
        {ctry}
      </div>
      {nationList && (
        <div
          className={`round8 borderDark bgWhite ${SelectCtryCSS.nationList}`}
          ref={(el) => refArray<HTMLElement>(el, selectCtryRef)}
        >
          <div
            className={SelectCtryCSS.title}
            ref={(el) => refArray<HTMLElement>(el, selectCtryRef)}
          >
            국가 선택
          </div>
          <div
            className={SelectCtryCSS.nationContent}
            ref={(el) => refArray<HTMLElement>(el, selectCtryRef)}
          >
            {nation.map((n, i) => (
              <button
                onClick={async () => {
                  localStorage.setItem("country", n[0]);
                  dispatch(changeCountry(n[0]));
                  setNationList(false);
                  const { ip } = await getData("/api");
                  console.log(ip);
                }}
                key={`ctry${i}`}
                className={`bold ${SelectCtryCSS.option}`}
                ref={(el) => refArray<HTMLElement>(el, selectCtryRef)}
              >
                {n[0]} - {n[1]}
              </button>
            ))}
            <div
              className={SelectCtryCSS.closeNation}
              onClick={() => setNationList(false)}
              ref={(el) => refArray<HTMLElement>(el, selectCtryRef)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SelectCtry;
