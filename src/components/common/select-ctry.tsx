import { Dispatch, SetStateAction } from "react";

export function SelectCtry({
  ctry,
  setCtry,
  nation,
}: {
  ctry: string;
  setCtry: Dispatch<SetStateAction<string>>;
  nation: string[];
}) {
  return (
    <>
      <select
        id="selectCtry"
        onChange={(e) => setCtry(e.target.value)}
        defaultValue={ctry}
      >
        {nation.map((n, i) => (
          <option key={`ctry${i}`}>{n}</option>
        ))}
      </select>
    </>
  );
}
