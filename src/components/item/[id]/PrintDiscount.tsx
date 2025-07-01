import { useAppSelector } from "@/lib/store";
import { exchangeRates, monUnitChart } from "@/lib/testData";
import {
  clacDiscount,
  exchangePriceCallback,
  monUnitSymbol,
} from "@/lib/utils";

export const PrintPrice = ({
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

  const discountPrice = clacDiscount(discount, exchangePrice, pPrice);

  return (
    <div>
      {discount ? (
        <>
          <p>{`-${discount}% ${cMonUnit}${discountPrice}`}</p>
          <p>정가: {`${cMonUnit}${exchangePrice(pPrice)}`}</p>
        </>
      ) : (
        <p>
          {cMonUnit}${discountPrice}
        </p>
      )}
    </div>
  );
};

export default PrintPrice;
