"use client";
import { changeCountry } from "@/lib/features/counter/countrySlice";
import { getData } from "@/lib/handleData";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { nation } from "@/lib/testData";
import NavCSS from "./nav.module.css";

function SelectCtry() {
  const ctry = useAppSelector((state) => state.country.value);
  const dispatch = useAppDispatch();

  return (
    <>
      <select
        id="selectCtry"
        onChange={async (e) => {
          localStorage.setItem("country", e.target.value);
          dispatch(changeCountry(e.target.value));
          const { ip } = await getData("/api");
          console.log(ip);
        }}
        value={ctry}
        className={NavCSS.SelectCtry}
      >
        {nation.map((n, i) => (
          <option key={`ctry${i}`}>{n}</option>
        ))}
      </select>
    </>
  );
}

export default SelectCtry;
