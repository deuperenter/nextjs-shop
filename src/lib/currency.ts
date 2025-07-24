import { NumberObjectArray, StringObjectArray } from "@/types/utils";

// 화폐 관련
export function monUnitSymbol(cCtry: string, monUnitChart: StringObjectArray) {
  for (const monUnit of monUnitChart) {
    if (monUnit[cCtry]) {
      return monUnit[cCtry];
    }
  }
  return "$";
}

export function exchangePrice(
  cCtry: string,
  exchangeRates: NumberObjectArray,
  pCtry: string,
  pPrice: number
) {
  if (pCtry === cCtry) {
    return pPrice;
  }

  let cCtryPrice: number = 0;
  let pCtryPrice: number = 0;

  for (const exchangeRate of exchangeRates) {
    if (exchangeRate[cCtry]) {
      cCtryPrice = exchangeRate[cCtry];
    }

    if (exchangeRate[pCtry]) {
      pCtryPrice = exchangeRate[pCtry];
    }
  }

  if (cCtryPrice && pCtryPrice) {
    // 소수점을 쓰는 나라인 경우 소수점 2자리 표기
    if (["US", "CA"].includes(cCtry)) {
      return Math.ceil(((pPrice * cCtryPrice) / pCtryPrice) * 100) / 100;
    }
    return Math.ceil((pPrice * cCtryPrice) / pCtryPrice);
  } else {
    throw new Error("상품의 국가 표기가 잘못됐습니다.");
  }
}

export function calcDiscount(discount: number | undefined, price: number) {
  return discount ? Math.ceil(price * (100 - discount)) / 100 : price;
}
