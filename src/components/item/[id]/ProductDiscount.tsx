"use client";
import { useAppSelector } from "@/lib/store";
import {
  exchangeRates,
  monUnitChart,
} from "../../../../archive/item/common/testData";
import {
  calcDiscount,
  exchangePriceCallback,
  monUnitSymbol,
} from "@/lib/utils";

export const ProductPrice = ({
  discount,
  pPrice,
  pCtry,
}: {
  discount: number | undefined;
  pPrice: number;
  pCtry: string;
}) => {
  const ctry = useAppSelector((state) => state.country.value);

  const cMonUnit = monUnitSymbol(ctry, monUnitChart) || "$";

  const exchangePrice = exchangePriceCallback(pCtry, ctry, exchangeRates);

  const discountPrice = calcDiscount(discount, exchangePrice, pPrice);

  return (
    <div>
      {discount ? (
        <>
          <p className="font24">{`-${discount}% ${cMonUnit}${discountPrice}`}</p>
          <p className="text-under">
            정가: {`${cMonUnit}${exchangePrice(pPrice)}`}
          </p>
        </>
      ) : (
        <p>
          {cMonUnit}${discountPrice}
        </p>
      )}
    </div>
  );
};

export default ProductPrice;
