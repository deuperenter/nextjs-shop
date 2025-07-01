"use client";
import WebEditor from "@/components/common/WebEditor";
import SelectCtry from "@/components/common/SelectCtry";
import PrintCaterory from "@/components/item/[id]/PrintCategory";
import PrintDelivery from "@/components/item/[id]/PrintDelivery";
import PrintOptions from "@/components/item/[id]/PrintOptions";
import PrintReviews from "@/components/item/[id]/PrintReviews";
import PrintPrice from "@/components/item/[id]/PrintDiscount";
import PrintDetail from "@/components/item/[id]/PrintDetail";
import ShowStock from "@/components/item/[id]/ShowStock";
import { deliveryData, detailData, subDetailsData } from "@/lib/testData";
import PrintDescription from "@/components/item/[id]/PrintDescription";

const ProductDetail = () => {
  const detail = detailData;
  const subDetails = subDetailsData;
  const delivery = deliveryData;

  const { pId, category, seller, rating, options, fromSelImg, pDesc, reviews } =
    detail;
  const { ratingScore, totalRating } = rating;
  const {
    pImgs,
    pVideo,
    pName,
    pPrice,
    pCtry,
    discount,
    stock,
    feature,
    pInfo,
  } = subDetails;

  return (
    <div>
      <SelectCtry />
      <PrintCaterory category={category} />
      <PrintDetail
        pImgs={pImgs}
        pVideo={pVideo}
        pName={pName}
        seller={seller}
        ratingScore={ratingScore}
        pId={pId}
        totalRating={totalRating}
        rating={rating}
      />
      <PrintPrice discount={discount} pPrice={pPrice} pCtry={pCtry} />
      {options && <PrintOptions options={options} />}
      <ShowStock stock={stock} />
      <WebEditor editable={true} initial={feature} />
      <PrintDelivery
        delivery={delivery}
        pCtry={pCtry}
        discount={discount}
        pPrice={pPrice}
      />
      <WebEditor editable={true} initial={pInfo} />
      <PrintDescription fromSelImg={fromSelImg} pDesc={pDesc} />
      <PrintReviews pId={pId} reviews={reviews} />
    </div>
  );
};

export default ProductDetail;
