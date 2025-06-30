// 나중에 서버 사이드 컴포넌트와 클라이언트 사이드 컴포넌트를 구분해야 한다.
"use client";
import WebEditor from "@/app/test/web-editor";
import { SelectCtry } from "@/components/common/select-ctry";
import { PrintCaterory } from "@/components/item/[id]/print-category";
import { PrintDelivery } from "@/components/item/[id]/print-delivery";
import { PrintOptions } from "@/components/item/[id]/print-options";
import { PrintReviews } from "@/components/item/[id]/print-reviews";
import { ShowStock } from "@/components/item/[id]/show-stock";
import {
  deliveryData,
  detailData,
  exchangeRates,
  monUnitChart,
  nation,
  subDetailsData,
} from "@/lib/test-data";
import {
  clacDiscount,
  exchangePriceCallback,
  monUnitSymbol,
} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ProductDetail = () => {
  const [ctry, setCtry] = useState("US");

  const detail = detailData;
  const subDetails = subDetailsData;
  const delivery = deliveryData;

  const { pId, category, seller, rating, options, fromSelImg, pDesc, reviews } =
    detail;
  const { ratingScore, totalRating } = rating;
  const {
    pImgs,
    pVideo,
    pName,
    pPrice,
    pCtry,
    discount,
    stock,
    feature,
    pInfo,
  } = subDetails;

  // 컴포넌트 내 최상위 지역 변수
  const cMonUnit = monUnitSymbol(ctry, monUnitChart) || "$";
  const exchangePrice = exchangePriceCallback(pCtry, ctry, exchangeRates);

  const discountPrice = clacDiscount(discount, exchangePrice, pPrice);

  return (
    <div>
      <SelectCtry ctry={ctry} setCtry={setCtry} nation={nation} />
      <PrintCaterory category={category} />
      <Image src={pImgs[0]} alt="상품 이미지1" width={250} height={250} />
      {pVideo && (
        <video width={320} height={320} controls preload="none">
          <source src={pVideo[0]} type="video/mp4" />
        </video>
      )}
      <p>{pName}</p>
      <p>
        <Link href={`/seller/${seller}`}>{seller}의 다른 상품 보기</Link>
      </p>
      <span>
        {ratingScore}&nbsp;&nbsp;&nbsp;
        <Link href={`/reviews/${pId}`}>{totalRating}개의 리뷰</Link>
      </span>
      <p>5점: {rating[5]}</p>
      <p>4점: {rating[4]}</p>
      <p>3점: {rating[3]}</p>
      <p>2점: {rating[2]}</p>
      <p>1점: {rating[1]}</p>

      {discount ? (
        <p>{`-${discount}% ${cMonUnit}${discountPrice}`}</p>
      ) : (
        <p>
          {cMonUnit}${discountPrice}
        </p>
      )}
      {discount && <p>정가: {`${cMonUnit}${exchangePrice(pPrice)}`}</p>}
      {options && <PrintOptions options={options} />}
      <ShowStock stock={stock} />
      <WebEditor editable={true} initial={feature} />
      <PrintDelivery
        delivery={delivery}
        cMonUnit={cMonUnit}
        discountPrice={discountPrice}
        exchangePrice={exchangePrice}
      />
      <WebEditor editable={true} initial={pInfo} />
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
      <p>리뷰 보기</p>
      <PrintReviews reviews={reviews} />
      <p>
        <Link href={`/reviews/${pId}`}>리뷰 더 보기</Link>
      </p>
    </div>
  );
};

export default ProductDetail;
