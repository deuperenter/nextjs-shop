import Image from "next/image";
import React from "react";
import DescCSS from "./PrintDescription.module.css";
import WebEditor from "@/components/common/WebEditor";

const PrintDescription = ({
  fromSelImg,
  pDesc,
}: {
  fromSelImg: string[] | undefined;
  pDesc: string;
}) => {
  return (
    <>
      <div className={DescCSS.noSpace}>
        <p className="font24">제조사 제공 이미지</p>
        {fromSelImg?.map((fImg, i) => (
          <Image
            key={`rImage${i}`}
            src={fImg}
            alt="상품 이미지1"
            width={500}
            height={500}
            className={DescCSS.imgs}
          />
        ))}
      </div>
      <p content=""></p>
      <hr />
      <p id="reviewSection" className="font24">
        제품 설명
      </p>
      <p content=""></p>
      <WebEditor editable={false} initial={pDesc} />
      <hr />
    </>
  );
};

export default PrintDescription;
