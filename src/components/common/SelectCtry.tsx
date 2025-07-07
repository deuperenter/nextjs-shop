"use client";
import { changeCountry } from "@/lib/features/counter/countrySlice";
import { getData } from "@/lib/handleData";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { nation } from "@/lib/testData";
import NavCSS from "./nav.module.css";
import RoundCSS from "./round.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function SelectCtry() {
  const ctry = useAppSelector((state) => state.country.value);
  const dispatch = useAppDispatch();
  const [nationList, setNationList] = useState(false);

  return (
    <>
      <div
        id="selectCtry"
        onClick={() => {
          setNationList(!nationList);
        }}
        className={NavCSS.SelectCtry}
      >
        {ctry}
      </div>
      {nationList && (
        <div
          className={`${NavCSS.nationList} ${RoundCSS.round} ${RoundCSS.borderDark} ${RoundCSS.bgWhite}`}
        >
          <div className={NavCSS.title}>국가 선택</div>
          <div className={NavCSS.nationContent}>
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
                className={NavCSS.option}
              >
                {n[0]} - {n[1]}
              </button>
            ))}
            <div
              className={NavCSS.closeNation}
              onClick={() => setNationList(false)}
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
