import { StringObjectArray } from "./utils";

export type Reviews = {
  contents: {
    rId: string;
    uProfile: string;
    uName: string;
    uCtry: string;
    rTitle: string;
    rText: string;
    rating: number;
    rImgs?: string[];
    rvideos?: string[];
    rDate: string;
    rOptions?: StringObjectArray;
    totalUseful: number;
    useful: boolean;
  }[];
};

export type Options = {
  type: { [k: string]: string[] | StringObjectArray };
  ables: string[];
};

export type RatingData = {
  totalRating: number;
  ratingScore: number;
  scores5To1: number[];
};

export type Detail = {
  pId: string;
  category: string[];
  seller: string;
  options?: Options;
  rating: RatingData;
  fromSelImg?: string[];
  pDesc: string;
  reviews: Reviews;
};

export type SubDetails = {
  pSubId: string;
  pImgs: string[];
  pVideo?: string[];
  pVideoThumb?: string[];
  pName: string;
  pPrice: number;
  pCtry: string;
  discount?: number;
  stock: number;
  pFeature: string;
  pInfo: string;
};

export type Delivery = {
  dFee: number;
  dDate: string;
  dImpCharge: number;
  ableCtry: string[];
};
