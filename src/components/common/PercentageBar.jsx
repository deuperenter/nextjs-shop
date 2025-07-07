"use client";
import "./PercentageBar.css";

const PercentageBar = ({ percentage }) => {
  return (
    <>
      <div className="bar-container">
        <div
          className="bar-fill"
          style={{
            width: `${Math.min(percentage, 100)}%`,
            backgroundColor: "#cdcd1e",
          }}
        >
          <span className="bar-label"></span>
        </div>
      </div>
    </>
  );
};

export default PercentageBar;
