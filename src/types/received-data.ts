export type reviews = {
  content: {
    rId: string;
    uName: string;
    uCtry: string;
    rTitle: string;
    rText: string;
    rating: number;
    rImgs?: string[];
    rvideo?: string[];
    rDate: string;
    useful: number;
  }[];
};

export type options = {
  // [k: string]: { [k: string]: string }[]은 이 코드 뒤에 설명이 있습니다.
  type: { [k: string]: string[] | { [k: string]: string }[] };
  able: string[];
};

export type detail = {
  pId: string;
  category: string[];
  seller: string;
  options?: options;
  rating: {
    totalRating: number;
    ratingScore: number;
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  fromSelImg?: string[];
  pDesc: string;
  reviews: reviews;
};

export type subDetails = {
  pSubId: string;
  pImgs: string[];
  pVideo?: string[];
  pName: string;
  pPrice: number;
  pCtry: string;
  discount?: number;
  stock: number;
  feature: string;
  pInfo: string;
};

export type delivery = {
  dFee: number;
  dDate: string;
  dImpCharge: number;
  ableCtry: string[];
};
