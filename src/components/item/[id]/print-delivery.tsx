import { Delivery } from "@/types/received-data";
import { ExchangePrice } from "@/types/utils";

export const PrintDelivery = ({
  delivery,
  cMonUnit,
  discountPrice,
  exchangePrice,
}: {
  delivery: Delivery;
  cMonUnit: string;
  discountPrice: number;
  exchangePrice: ExchangePrice;
}) => {
  const { dFee, dDate, dImpCharge, ableCtry } = delivery;

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
