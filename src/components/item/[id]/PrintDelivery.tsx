import { useAppSelector } from "@/lib/store";
import { exchangeRates, monUnitChart } from "@/lib/testData";
import {
  clacDiscount,
  exchangePriceCallback,
  monUnitSymbol,
} from "@/lib/utils";
import { Delivery } from "@/types/receivedData";

const PrintDelivery = ({
  delivery,
  pCtry,
  discount,
  pPrice,
}: {
  delivery: Delivery;
  pCtry: string;
  discount: number | undefined;
  pPrice: number;
}) => {
  const { dFee, dDate, dImpCharge, ableCtry } = delivery;

  const ctry = useAppSelector((state) => state.country.value);

  const cMonUnit = monUnitSymbol(ctry, monUnitChart) || "$";
  const exchangePrice = exchangePriceCallback(pCtry, ctry, exchangeRates);

  const discountPrice = clacDiscount(discount, exchangePrice, pPrice);

  if (!ableCtry.includes("KR")) {
    return "현재 지역은 배송 불가능합니다.";
  }

  return (
    <>
      <p>
        가격: {cMonUnit}
        {discountPrice}
      </p>
      <p>
        배송비: {cMonUnit}
        {exchangePrice(dFee)}
      </p>
      <p>
        관세: {cMonUnit}
        {exchangePrice(dImpCharge)}
      </p>
      <p>
        총합: {cMonUnit}
        {discountPrice + exchangePrice(dFee) + exchangePrice(dImpCharge)}
      </p>
      <p>배송 가능 날짜: {dDate}</p>
    </>
  );
};

export default PrintDelivery;
