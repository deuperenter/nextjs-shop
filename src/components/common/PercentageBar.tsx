import PercentageBarCSS from "./PercentageBar.module.css";

const PercentageBar = ({ percentage }: { percentage: number }) => {
  const checkedValue = `${Math.max(Math.min(percentage, 100), 0)}%`;

  return (
    <div className={PercentageBarCSS.barContainer}>
      <div
        className={PercentageBarCSS.barFill}
        style={{
          width: checkedValue,
        }}
      ></div>
    </div>
  );
};

export default PercentageBar;
