"use client";
import { useAppSelector } from "@/lib/hook";
import { calcDiscount, exchangePrice, monUnitSymbol } from "@/lib/currency";
import { Delivery } from "@/types/receivedData";
import StockNBuy from "./StockNBuy";

const ProductDelivery = ({
  delivery,
  pCtry,
  discount,
  pPrice,
  stock,
}: {
  delivery: Delivery;
  pCtry: string;
  discount: number | undefined;
  pPrice: number;
  stock: number;
}) => {
  const { dFee, dDate, dImpCharge, ableCtry } = delivery;

  const { fulfilled, monUnitChart, exchangeRates } = useAppSelector(
    (state) => state.currency.value
  );
  const ctry = useAppSelector((state) => state.country.value);

  let cMonUnit = "";
  let discountPrice = 0;
  let fee = 0;
  let impPrice = 0;

  if (fulfilled) {
    cMonUnit = monUnitSymbol(ctry, monUnitChart);
    fee = exchangePrice(ctry, exchangeRates, pCtry, dFee);
    impPrice = exchangePrice(ctry, exchangeRates, pCtry, dImpCharge);
    discountPrice = calcDiscount(
      discount,
      exchangePrice(ctry, exchangeRates, pCtry, pPrice)
    );
  }

  if (!ableCtry.includes(ctry)) {
    return <p>현재 지역은 배송이 불가능합니다.</p>;
  }

  return (
    <>
      {fulfilled && (
        <>
          <p>
            가격: {cMonUnit}
            {discountPrice}
          </p>
          <p>
            배송비: {cMonUnit}
            {fee}
          </p>
          <p>
            관세: {cMonUnit}
            {impPrice}
          </p>
          <p>
            총합: {cMonUnit}
            {discountPrice + fee + impPrice}
          </p>
          <p>배송 가능 날짜: {dDate}</p>
          <hr />
          <StockNBuy stock={stock} />
        </>
      )}
    </>
  );
};

export default ProductDelivery;
