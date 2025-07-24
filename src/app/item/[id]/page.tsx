import { getData } from "@/lib/handleData";
import { Delivery, Detail, SubDetails } from "@/types/receivedData";
import ProductCategory from "@/components/item/[id]/ProductCategory";
import MediaSlider from "@/components/common/MediaSlider";
import Link from "next/link";
import "./layout.css";
import PrintRating from "@/components/common/PrintRating";
import ProductPrice from "@/components/item/[id]/ProductPrice";
import ProductOptions from "@/components/item/[id]/ProductOptions";
import WebEditor from "@/components/common/WebEditor";
import ProductReviews from "@/components/item/[id]/ProductReviews";
import ProductDelivery from "@/components/item/[id]/ProductDelivery";
import ProductDescriptionImage from "@/components/item/[id]/ProductDescriptionImage";
import ProductReport from "@/components/item/[id]/ProductReport";

const ProductDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const detail: Detail = await getData("http://localhost:3000/data/detail");
  const subDetails: SubDetails = await getData(
    "http://localhost:3000/data/subdetails"
  );
  const delivery: Delivery = await getData(
    "http://localhost:3000/data/delivery"
  );

  const { pId, category, seller, rating, options, fromSelImg, pDesc, reviews } =
    detail;
  const {
    pImgs,
    pVideo,
    pVideoThumb,
    pName,
    pPrice,
    pCtry,
    discount,
    stock,
    pFeature,
    pInfo,
  } = subDetails;

  return (
    <>
      <ProductCategory category={category} />
      <div className="detail-main">
        <div className="detail-main-left">
          <MediaSlider
            pImgs={pImgs}
            pVideo={pVideo}
            pVideoThumb={pVideoThumb}
          />
        </div>
        <div className="detail-main-right">
          <div className="font24">{pName}</div>
          <p>
            <Link href={`/seller/${seller}`}>{seller}의 다른 상품 보기</Link>
          </p>
          <PrintRating rating={rating} />
          <ProductPrice discount={discount} pPrice={pPrice} pCtry={pCtry} />
          <ProductOptions options={options} />
          <hr />
          <WebEditor editable={false} initial={pFeature} />
          <hr />
          <ProductDelivery
            delivery={delivery}
            pCtry={pCtry}
            discount={discount}
            pPrice={pPrice}
            stock={stock}
          />
          <ProductReport pId={pId} seller={seller} />
        </div>
      </div>
      <hr />
      <WebEditor editable={false} initial={pInfo} />
      <ProductDescriptionImage fromSelImg={fromSelImg} />
      <hr />
      <p className="font24">제품 설명</p>
      <WebEditor editable={false} initial={pDesc} />
      <hr />
      <ProductReviews pId={pId} reviews={reviews} />
    </>
  );
};

export default ProductDetail;
