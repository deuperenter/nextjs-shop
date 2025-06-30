import { StringArray } from "./utils";

export type Reviews = {
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

export type Options = {
  type: { [k: string]: string[] | StringArray };
  able: string[];
};

export type Detail = {
  pId: string;
  category: string[];
  seller: string;
  options?: Options;
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
  reviews: Reviews;
};

export type SubDetails = {
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

export type Delivery = {
  dFee: number;
  dDate: string;
  dImpCharge: number;
  ableCtry: string[];
};
