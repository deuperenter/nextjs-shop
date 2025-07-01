import Image from "next/image";
import React from "react";

const PrintDescription = ({
  fromSelImg,
  pDesc,
}: {
  fromSelImg: string[] | undefined;
  pDesc: string;
}) => {
  return (
    <div>
      {fromSelImg?.map((fImg, i) => (
        <Image
          key={`rImage${i}`}
          src={fImg}
          alt="상품 이미지1"
          width={250}
          height={250}
        />
      ))}
      <p>제품 설명</p>
      <p>{pDesc}</p>
    </div>
  );
};

export default PrintDescription;
