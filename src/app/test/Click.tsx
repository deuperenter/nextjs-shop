import React, { useRef, useEffect } from "react";

const Click = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (containerRef.current?.contains(event.target as Node)) {
        console.log("🔵 내부 클릭 (깊은 자식 포함)");
      } else {
        console.log("⚪ 외부 클릭");
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div ref={containerRef} style={{ padding: 20, border: "2px solid blue" }}>
      <div>
        <button>22</button>
        <div>
          <div>
            <button>깊은 자식 버튼</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Click;
