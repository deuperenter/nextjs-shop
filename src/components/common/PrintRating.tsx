"use client";
import { useState } from "react";
import { Rating } from "react-simple-star-rating";

const PrintRating = ({
  readonly,
  initialValue,
}: {
  readonly?: true;
  initialValue: number;
}) => {
  const [rating, setRating] = useState(0);

  const handleRating = (rate: number) => {
    setRating(rate);
  };
  const onPointerEnter = () => console.log("Enter");
  const onPointerLeave = () => console.log("Leave");
  const onPointerMove = (value: number, index: number) =>
    console.log(value, index, rating);

  return (
    <Rating
      readonly={readonly}
      allowFraction
      transition
      onClick={handleRating}
      size={30}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerMove={onPointerMove}
      initialValue={Math.round(initialValue * 2) / 2}
    />
  );
};

export default PrintRating;
