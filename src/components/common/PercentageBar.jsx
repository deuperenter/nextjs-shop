"use client";
import PercentageBarCSS from "./PercentageBar.module.css";

const PercentageBar = ({ percentage, ref }) => {
  return (
    <>
      <div className={PercentageBarCSS.barContainer} ref={ref}>
        <div
          className={PercentageBarCSS.barFill}
          style={{
            width: `${Math.min(percentage, 100)}%`,
            backgroundColor: "#cdcd1e",
          }}
          ref={ref}
        ></div>
      </div>
    </>
  );
};

export default PercentageBar;
