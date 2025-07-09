import { NumberObjectArray, StringObjectArray } from "@/types/utils";
import { RefObject } from "react";

export function monUnitSymbol(cCtry: string, monUnitChart: StringObjectArray) {
  for (const monUnit of monUnitChart) {
    if (monUnit[cCtry]) {
      return monUnit[cCtry];
    }
  }
}

export function exchangePriceCallback(
  pCtry: string,
  cCtry: string,
  exchangeRates: NumberObjectArray
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

export function calcDiscount(
  discount: number | undefined,
  exchangePrice: (pPrice: number) => number,
  pPrice: number
) {
  return discount
    ? Math.ceil((exchangePrice(pPrice) * (100 - discount)) / 100)
    : exchangePrice(pPrice);
}

export const REPORT_SUCCESS = ["신고 완료했습니다."];
export const ALERT_FAILED = ["오류가 발생했습니다.", "관리자에게 문의해주세요"];

export function refArray<T>(el: T | null, ref: RefObject<(T | null)[]>) {
  if (el && !ref.current.includes(el)) {
    ref.current.push(el);
  }
}

export function hideScroll(condition: boolean = true) {
  const main = document.querySelector("main");
  const nav = document.querySelector("nav div");
  const footer = document.querySelector("footer div");

  if (condition) {
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (main instanceof HTMLElement) {
      main.style.marginRight = `${scrollBarWidth + 30}px`;
    }

    if (nav instanceof HTMLElement) {
      nav.style.paddingRight = `${scrollBarWidth + 30}px`;
    }

    if (footer && footer instanceof HTMLElement) {
      footer.style.paddingRight = `${scrollBarWidth + 30}px`;
    }

    document.body.style.overflow = "hidden";
  }
}

export function showScroll() {
  const main = document.querySelector("main");
  const nav = document.querySelector("nav div");
  const footer = document.querySelector("footer div");

  document.body.style.overflow = "";

  if (main instanceof HTMLElement) {
    main.style.marginRight = `30px`;
  }

  if (nav instanceof HTMLElement) {
    nav.style.paddingRight = `30px`;
  }

  if (footer instanceof HTMLElement) {
    footer.style.paddingRight = "0px";
  }
}
