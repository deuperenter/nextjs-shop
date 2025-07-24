import { useRef } from "react";

interface InfoBoxProps {
  onClose: () => void;
}

const InfoBox: React.FC<InfoBoxProps> = ({ onClose }) => {
  const boxRef = useRef<HTMLDivElement>(null);

  const handleClickCapture = (e: React.MouseEvent) => {
    if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div onClickCapture={handleClickCapture}>
      <div
        ref={boxRef}
        style={{
          position: "absolute",
          top: "100px",
          left: "100px",
          background: "white",
          border: "1px solid #ccc",
          padding: "1rem",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          zIndex: 100,
        }}
      >
        <p>여기는 정보창입니다.</p>
      </div>
    </div>
  );
};

export default InfoBox;
