export type detail = {
  pid: string;
  seller: string;
  options?: {
    // [k: string]: { [k: string]: string }[]은 이 코드 뒤에 설명이 있습니다.
    type: { [k: string]: string[] | { [k: string]: string }[] };
    able: string[];
  };
  fromSelImg?: string[];
  pDesc: string[];
  reviews: {
    content: {
      rId: string;
      rText: string;
      rating: number;
      rImgs?: string[];
      rvideo?: string[];
    }[];
  };
};

export type subDetails = {
  pSubId: string;
  pImgs: string[];
  pVideo?: string[];
  pName: string;
  pPrice: number;
  pMonUnit: string;
  discount?: number;
  stock: number;
  feature: string[];
  // 어떤 내용이 들어갈지 몰라 object로 했습니다. 객체인지 배열인지 구분해서 출력하는 것도 뒤에서 설명하겠습니다.
  pInfo: object;
};

export type delivery = {
  dFee: string;
  dDate: string;
  dImpCharge: string;
  dMonUnit: string;
  ableCtry: string[];
};
