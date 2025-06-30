import { ExchangePrice, NumberArray, StringArray } from "@/types/utils";

export function monUnitSymbol(cCtry: string, monUnitChart: StringArray) {
  for (const monUnit of monUnitChart) {
    if (monUnit[cCtry]) {
      return monUnit[cCtry];
    }
  }
}

export function exchangePriceCallback(
  pCtry: string,
  cCtry: string,
  exchangeRates: NumberArray
) {
  if (pCtry === cCtry) {
    return function (pPrice: number) {
      return pPrice;
    };
  }

  let pCtryPrice: number = 0;
  let cCtryPrice: number = 0;
  for (const exchangeRate of exchangeRates) {
    if (exchangeRate[pCtry]) {
      pCtryPrice = exchangeRate[pCtry];
    }

    if (exchangeRate[cCtry]) {
      cCtryPrice = exchangeRate[cCtry];
    }
  }
  if (cCtryPrice && pCtryPrice) {
    return function (pPrice: number) {
      // 소수점을 쓰는 나라인 경우 소수점 2자리 표기
      if (["US", "CA"].includes(cCtry)) {
        return Math.ceil(((pPrice * cCtryPrice) / pCtryPrice) * 100) / 100;
      }
      return Math.ceil((pPrice * cCtryPrice) / pCtryPrice);
    };
  } else {
    throw new Error("상품의 국가 표기가 잘못됐습니다.");
  }
}

export function clacDiscount(
  discount: number | undefined,
  exchangePrice: ExchangePrice,
  pPrice: number
) {
  return discount
    ? Math.ceil((exchangePrice(pPrice) * (100 - discount)) / 100)
    : exchangePrice(pPrice);
}
