"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectCountryCSS from "./SelectCountry.module.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { fetchCountryList } from "@/lib/features/countryList/countryListSlice";
import { changeCountry } from "@/lib/features/country/countrySlice";

const SelectCountry = () => {
  const [showSelect, setShowSelect] = useState(false);
  const country = useAppSelector((state) => state.country.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCountryList());
    if (localStorage.getItem("country")) {
      dispatch(changeCountry(localStorage.getItem("country") || "US"));
    }
  }, []);

  return (
    <>
      <div className={SelectCountryCSS.openBtn}>
        <button
          className={SelectCountryCSS.openSelect}
          onClick={() => setShowSelect(!showSelect)}
        >
          {country}
        </button>
        {showSelect && <SelectCountryContent setShowSelect={setShowSelect} />}
      </div>
    </>
  );
};

const SelectCountryContent = ({
  setShowSelect,
}: {
  setShowSelect: Dispatch<SetStateAction<boolean>>;
}) => {
  const countryList = useAppSelector((state) => state.countryList.value);
  const dispatch = useAppDispatch();

  const countryRef = useRef<HTMLDivElement>(null);

  const closeCountry = (e: MouseEvent) => {
    if (e.target instanceof Node && !countryRef.current?.contains(e.target)) {
      setShowSelect(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeCountry);

    return () => {
      document.removeEventListener("click", closeCountry);
    };
  }, []);

  return (
    <div
      className={`borderDark bgWhite round8 ${SelectCountryCSS.container}`}
      ref={countryRef}
    >
      <div className={`bold ${SelectCountryCSS.title}`}>국가 선택</div>
      <button
        className={`${SelectCountryCSS.closeBtn}`}
        onClick={() => setShowSelect(false)}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
      {countryList.map((c) => (
        <button
          className={SelectCountryCSS.countryBtn}
          key={c[0]}
          onClick={() => {
            dispatch(changeCountry(c[0]));
            localStorage.setItem("country", c[0]);
          }}
        >{`${c[0]} - ${c[1]}`}</button>
      ))}
    </div>
  );
};

export default SelectCountry;
