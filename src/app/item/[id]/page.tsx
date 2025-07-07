import WebEditor from "@/components/common/WebEditor";
import PrintCaterory from "@/components/item/[id]/PrintCategory";
import PrintDelivery from "@/components/item/[id]/PrintDelivery";
import PrintOptions from "@/components/item/[id]/PrintOptions";
import PrintReviews from "@/components/item/[id]/PrintReviews";
import PrintPrice from "@/components/item/[id]/PrintDiscount";
import PrintDetail from "@/components/item/[id]/PrintDetail";
import StockNBuy from "@/components/common/StockNBuy";
import PrintDescription from "@/components/item/[id]/PrintDescription";
import { getData } from "@/lib/handleData";
import { Delivery, Detail, SubDetails } from "@/types/receivedData";
import { EmblaOptionsType } from "embla-carousel";
import MediaSilder from "@/components/common/MediaSilder";
import "./layout.css";

const ProductDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  // console.log(id);

  const detail: Detail = await getData("http://localhost:3000/detail");
  const subDetails: SubDetails = await getData(
    "http://localhost:3000/subDetails"
  );
  const delivery: Delivery = await getData("http://localhost:3000/delivery");

  const { pId, category, seller, rating, options, fromSelImg, pDesc, reviews } =
    detail;
  const { ratingScore, totalRating } = rating;
  const {
    pImgs,
    pVideo,
    pVideoThumb,
    pName,
    pPrice,
    pCtry,
    discount,
    stock,
    feature,
    pInfo,
  } = subDetails;

  const OPTIONS: EmblaOptionsType = {};
  const pMedia = [[...pImgs]];

  if (pVideo && pVideoThumb) {
    pMedia.push([...pVideo], [...pVideoThumb]);
  }

  return (
    <>
      <PrintCaterory category={category} />
      <div className="detail-layout">
        <div>
          <MediaSilder pMedia={pMedia} options={OPTIONS} />
        </div>
        <div>
          <PrintDetail
            pImgs={pImgs}
            pVideo={pVideo}
            pVideoThumb={pVideoThumb}
            pName={pName}
            seller={seller}
            ratingScore={ratingScore}
            pId={pId}
            totalRating={totalRating}
            rating={rating}
          />
          <PrintPrice discount={discount} pPrice={pPrice} pCtry={pCtry} />
          <PrintOptions options={options} />
          <hr />
          <WebEditor editable={false} initial={feature} />
          <hr />
          <PrintDelivery
            delivery={delivery}
            pCtry={pCtry}
            discount={discount}
            pPrice={pPrice}
          />
          <hr />
          <StockNBuy stock={stock} />
        </div>
      </div>
      <hr />
      <WebEditor editable={false} initial={pInfo} />
      <hr />
      <PrintDescription fromSelImg={fromSelImg} pDesc={pDesc} />
      <PrintReviews pId={pId} reviews={reviews} />
    </>
  );
};

export default ProductDetail;
