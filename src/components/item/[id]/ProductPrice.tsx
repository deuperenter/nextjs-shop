"use client";
import { useAppSelector } from "@/lib/hook";
import { calcDiscount, exchangePrice, monUnitSymbol } from "@/lib/currency";

export const ProductPrice = ({
  discount,
  pPrice,
  pCtry,
}: {
  discount: number | undefined;
  pPrice: number;
  pCtry: string;
}) => {
  const { fulfilled, monUnitChart, exchangeRates } = useAppSelector(
    (state) => state.currency.value
  );

  const ctry = useAppSelector((state) => state.country.value);

  let cMonUnit = "";
  let price = 0;
  let discountPrice = 0;

  if (fulfilled) {
    cMonUnit = monUnitSymbol(ctry, monUnitChart);
    price = exchangePrice(ctry, exchangeRates, pCtry, pPrice);
    discountPrice = calcDiscount(discount, price);
  }

  return (
    <div>
      {fulfilled && discount ? (
        <>
          <p className="font24">{`-${discount}% ${cMonUnit}${discountPrice}`}</p>
          <p className="text-through">정가: {`${cMonUnit}${price}`}</p>
        </>
      ) : fulfilled ? (
        <p>
          {cMonUnit}${discountPrice}
        </p>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductPrice;
