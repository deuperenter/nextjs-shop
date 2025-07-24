import Image from "next/image";
import React from "react";
import DescCSS from "./ProductDescriptionImage.module.css";

const ProductDescriptionImage = ({
  fromSelImg,
}: {
  fromSelImg: string[] | undefined;
}) => {
  return (
    fromSelImg && (
      <>
        <hr />
        <div className={DescCSS.noSpace}>
          <p className="font24">제조사 제공 이미지</p>
          {fromSelImg.map((fImg, i) => (
            <Image
              key={`pDescImage${i}`}
              src={fImg}
              alt={`pDescImage${i}`}
              width={500}
              height={500}
              className={DescCSS.imgs}
            />
          ))}
        </div>
      </>
    )
  );
};

export default ProductDescriptionImage;
