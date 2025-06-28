type Rbutton = {
  fontColor: string;
  content: string;
  bkgColor?: string;
  width?: string;
  height?: string;
  fontWeight?: string;
  borderColor?: string;
  submit?: boolean;
};

const Rbutton = ({
  fontColor,
  content,
  bkgColor = "transparent",
  width = "100%",
  height = "100%",
  fontWeight = "bold",
  borderColor = bkgColor,
  submit,
}: Rbutton) => {
  return (
    <button
      style={{
        backgroundColor: bkgColor,
        color: fontColor,
        width: `${width}px`,
        height: `${height}px`,
        fontSize: "18px",
        fontWeight: fontWeight,
        border: `1px solid ${borderColor}`,
      }}
      className="roundBtn"
      type={submit ? "submit" : undefined}
    >
      {content}
    </button>
  );
};

export default Rbutton;
