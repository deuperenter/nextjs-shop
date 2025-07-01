import { changeCountry } from "@/lib/features/counter/countrySlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { nation } from "@/lib/testData";

function SelectCtry({}) {
  const ctry = useAppSelector((state) => state.country.value);
  const dispatch = useAppDispatch();
  return (
    <>
      <select
        id="selectCtry"
        onChange={(e) => dispatch(changeCountry(e.target.value))}
        defaultValue={ctry}
      >
        {nation.map((n, i) => (
          <option key={`ctry${i}`}>{n}</option>
        ))}
      </select>
    </>
  );
}

export default SelectCtry;
