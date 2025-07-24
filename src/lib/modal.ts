import { ModalState } from "@/types/modal";

// Confirm에 입력할 내용
export const TO_CART = "TO_CART";
export const DELETE_WRITING = "DELETE_WRITING";

// Value 객체
export const TO_CART_DISPATCH: ModalState = {
  value: {
    alertMsg: ["상품을 장바구니에 담았습니다.", "장바구니로 이동하겠습니까?"],
    confirm: TO_CART,
  },
};

export const REPORT_SUCCESS_DISPATCH: ModalState = {
  value: {
    alertMsg: ["신고 완료했습니다."],
  },
};

export const ALERT_FAILED_DISPATCH: ModalState = {
  value: {
    alertMsg: ["오류가 발생했습니다.", "관리자에게 문의해주세요", "ERROR"],
  },
};

export const DELETE_WRITING_DISPATCH: ModalState = {
  value: {
    alertMsg: ["내용을 삭제하시겠습니까?"],
    confirm: DELETE_WRITING,
  },
};

// 스크롤 숨기기 보이기
export function hideScroll() {
  const main = document.querySelector("main");
  const nav = document.querySelector("nav div");
  const footer = document.querySelector("footer div");

  const scrollBarWidth =
    window.innerWidth - document.documentElement.clientWidth;

  const windowWidth = window.innerWidth;

  if (main instanceof HTMLElement) {
    main.style.marginRight = `${scrollBarWidth + 30}px`;
  }

  if (nav instanceof HTMLElement) {
    if (windowWidth < 1087) {
      nav.style.paddingRight = `${scrollBarWidth + 30}px`;
    } else {
      nav.style.paddingRight = `${scrollBarWidth / 2 + 30}px`;
      nav.style.paddingLeft = `${30 - scrollBarWidth / 2}px`;
    }
  }

  if (footer && footer instanceof HTMLElement) {
    footer.style.paddingRight = `${scrollBarWidth + 30}px`;
  }

  document.body.style.overflow = "hidden";
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
    nav.style.paddingLeft = `30px`;
  }

  if (footer instanceof HTMLElement) {
    footer.style.paddingRight = "0px";
  }
}
