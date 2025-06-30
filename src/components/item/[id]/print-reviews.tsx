"use client";
import { Reviews } from "@/types/received-data";
import Image from "next/image";
import { memo } from "react";

export const PrintReviews = memo(function PrintReviews({
  reviews,
}: {
  reviews: Reviews;
}) {
  return reviews.content.map((c) => {
    const { rId, rText, rating, rImgs, rvideo } = c;
    return (
      <div key={rId}>
        <div>{rating}</div>
        <div>{rText}</div>
        {rImgs?.map((img, i) => (
          <Image
            key={`rImage${i}`}
            alt={`reviewImg${i}`}
            src={img}
            width={250}
            height={250}
          />
        ))}
        {rvideo && (
          <video width={320} height={320} controls preload="none">
            <source src={rvideo[0]} type="video/mp4" />
          </video>
        )}
      </div>
    );
  });
});
