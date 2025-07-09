import WebEditor from "@/components/common/WebEditor";
import ProductCaterory from "@/components/item/[id]/ProductCategory";
import ProductDelivery from "@/components/item/[id]/ProductDelivery";
import ProductOptions from "@/components/item/[id]/ProductOptions";
import ProductReviews from "@/components/item/[id]/ProductReviews";
import ProductPrice from "@/components/item/[id]/ProductDiscount";
import ProductDetail from "@/components/item/[id]/ProductDetail";
import StockNBuy from "@/components/common/StockNBuy";
import ProductDescription from "@/components/item/[id]/ProductDescription";
import { getData } from "@/lib/handleData";
import { Delivery, Detail, SubDetails } from "@/types/receivedData";
import { EmblaOptionsType } from "embla-carousel";
import MediaSilder from "@/components/common/MediaSilder";
import "./layout.css";
import { Metadata } from "next";

const ProductDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  // console.log(id);

  const detail: Detail = await getData("http://localhost:3000/data/detail");
  const subDetails: SubDetails = await getData(
    "http://localhost:3000/data/subDetails"
  );
  const delivery: Delivery = await getData(
    "http://localhost:3000/data/delivery"
  );

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
      <ProductCaterory category={category} />
      <div className="detail-layout">
        <div>
          <MediaSilder pMedia={pMedia} options={OPTIONS} />
        </div>
        <div>
          <ProductDetail
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
          <ProductPrice discount={discount} pPrice={pPrice} pCtry={pCtry} />
          <ProductOptions options={options} />
          <hr />
          <WebEditor editable={false} initial={feature} />
          <hr />
          <ProductDelivery
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
      <ProductDescription fromSelImg={fromSelImg} pDesc={pDesc} />
      <ProductReviews pId={pId} reviews={reviews} />
    </>
  );
};

export default ProductDetailPage;
