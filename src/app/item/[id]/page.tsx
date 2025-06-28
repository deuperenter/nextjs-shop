import { delivery, detail, subDetails } from "@/types/received-data";
import Image from "next/image";
import Link from "next/link";

const ProductDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const detail: detail = {
    // product id, 상품 아이디, 상품을 구별하기 위해 사용합니다.
    pid: "111",
    // seller name, 판매자 이름입니다. 판매자 이름을 클릭(/seller/deuper)하면 판매자가 판매자는 상품의 목록을 볼 수 있습니다.
    seller: "deuper",
    // 옵션을 누르면 다른 상품을 보여줍니다. 모든 조합이 다 가능한 것은 아닙니다.
    options: {
      // 옵션별로 이름과, 섬네일 이미지 주소가 객체 배열로 있습니다. 섬네일이 없는 경우 배열 타입입니다.
      type: {
        color: [
          { red: "/detail_ex/image_red" },
          { blue: "/detail_ex/image_blue" },
          { white: "/detail_ex/image_white" },
          { black: "/detail_ex/image_black" },
        ],
        storage: ["500gb SSD", "1tb SSD", "2tb SSD"],
      },
      // 가능한 조합만을 보여줍니다. 예시 color[0] - storage[0] = red, 500gb SSD는 가능
      able: ["00", "01", "02", "10", "11", "20", "30"],
    },
    // 제조업체가 만든 상품 이미지입니다.
    fromSelImg: [
      "/detail_ex/from_sel_img1.png",
      "/detail_ex/from_sel_img2.png",
      "/detail_ex/from_sel_img3.png",
    ],
    // 제조업체에서 제공하는 설명입니다.
    pDesc: ["상품의 설명입니다."],
    // 사용자 리뷰 배열입니다.
    reviews: {
      // 리뷰 전체를 보여주지 않고 소량의 리뷰만 보여줍니다.
      // 리뷰 내용
      content: [
        {
          // review id: 번호, text: 내용, rating: 평가, rImgs: 리뷰 이미지들, 리뷰 동영상 주소입니다.
          rId: "1",
          rText: "Good!",
          rating: 5,
          rImgs: ["/detail_ex/rimg1.png"],
        },
        {
          rId: "2",
          rText: "Bad, It's Too Slow!",
          rating: 1,
          rImgs: ["/detail_ex/rimg2.png"],
          rvideo: ["/detail_ex/rvideo1.mp4"],
        },
      ],
    },
  };

  // 옵션을 선택한 특정 상품에 해당하는 내용입니다.
  const subDetails: subDetails = {
    // product sub id, 하위 상품 아이디
    pSubId: "234",
    // product images, 판매자가 올린 상품 이미지의 주소 배열입니다.
    pImgs: [
      "/detail_ex/img01.png",
      "/detail_ex/img02.png",
      "/detail_ex/img03.png",
      "/detail_ex/img04.png",
      "/detail_ex/img05.png",
      "/detail_ex/img06.png",
      "/detail_ex/img07.png",
      "/detail_ex/img08.png",
      "/detail_ex/img09.png",
      "/detail_ex/img10.png",
    ],
    // product video, 상품과 관련된 동영상의 주소 배열입니다.
    pVideo: ["/detail_ex/video1.mp4", "/detail_ex/video2.mp4"],
    // product name, 상품 이름입니다.
    pName: "111",
    // product price, 상품 가격, 상품 자체의 가격입니다. 배송비나 관세를 더하면 최종 가격이 나옵니다. 부가세 포함 가격입니다.
    pPrice: 300000,
    // product monetary unit, 화폐 단위, 쇼핑몰에서 적용하고 있는 환율을 기준으로 금액을 변환하는 데 사용합니다. 실시간 환율가 차이가 있을 수 있습니다. 설정한 국가가 바뀔 경우 pPrice와 mUnit를 이용해서 환율을 적용한 금액을 사용자에게 보여줍니다.
    pMonUnit: "won",
    // 할인율
    discount: 25,
    // 상품의 재고입니다. 1000개를 다 살 수 있는 게 아니라 일반 소비자인 경우 최대 30개까지 수량을 선택할 수 있도록 해야 합니다.
    stock: 1000,
    // (상품의) 특징, 문자열 배열로 되어 있습니다.
    feature: [
      "Portable: 어느 곳에서나 사용할 수 있습니다.",
      "Storage: 용랑이 큰 SSD로 용랑이 큰 게임을 설치할 수 있습니다.",
    ],
    // product info, 상품 정보, 이 객체의 구조는 상품마다 다를 수 있습니다.
    pInfo: {
      techDetail: {
        Summary: [
          { Display: "14 inches" },
          { Resolution: "1920 x 1080 Pixels" },
          { 생략: "예시이기 때문에 이 정도까지만 하겠습니다." },
        ],
        etc: [{ Brand: "EnterDeuper" }, { "Hardware Platform": "PC" }],
      },
      addInfo: {
        regDate: "2025-06-27",
      },
    },
    // 위 제품과 비슷한 상품 목록이나, 사용자의 쇼핑몰 데이터 기반으로 상품 목록을 보여주는 것은 데이터를 만들기 힘들기 때문에 제외했습니다.
  };

  const delivery: delivery = {
    // delivery fee, 배송비, 구매자가 지정한 국가를 기준으로 배송비를 산정한 금액입니다. 상품의 위치와 배송지의 거리를 기준으로 요금이 달라집니다. 사용자가 배송지를 바꿀 때마다 데이터를 요청해서 조건에 맞는 데이터를 가져옵니다.
    dFee: "100000",
    // Delivery Date,
    dDate: "2025-07-07",
    // Import Charge, 관세라는 뜻입니다. 다른 나라에서 물건이 올 경우 매기는 세금입니다.
    dImpCharge: "30000",
    // delivery monetary unit, 배송 관련 비용을 계산할 때 기준이 되는 화폐 단위입니다.
    dMonUnit: "won",
    // 배송 가능한 나라입니다. 배송이 불가능한 경우 이전 값을 그대로 유지하고 구매할 수 없다고 알려야 합니다.
    ableCtry: ["US", "CA", "KR"],
  };

  const { pid, seller, options, fromSelImg, pDesc, reviews } = detail;
  const { reviewPage, content } = reviews;
  const {
    pSubId,
    pImgs,
    pVideo,
    pName,
    pPrice,
    pMonUnit,
    discount,
    stock,
    feature,
    pInfo,
  } = subDetails;
  const { dFee, dDate, dImpCharge, dMonUnit, ableCtry } = delivery;

  const monUnitChart = {
    won: "₩",
  };

  function monUnitSymbol(monetaryUnit) {
    return monUnitChart[monetaryUnit];
  }

  function printPInfo(pInfo) {
    // 중첩 for 문으로 출력하면 된다.
  }

  return (
    <div>
      <Image src={pImgs[0]} alt="상품 이미지1" width={250} height={250} />
      {pVideo && (
        <video width={320} height={320} controls preload="none">
          <source src={pVideo[0]} type="video/mp4" />
        </video>
      )}
      <p>{pName}</p>
      <p>{seller}</p>
      <p>
        <Link href={`/seller/${seller}`}>{seller}의 다른 상품 보기</Link>
      </p>

      {discount && (
        <p>
          {`-${discount}% ${monUnitSymbol(pMonUnit)}${Math.ceil(
            (pPrice * (100 - discount)) / 100
          )}`}
        </p>
      )}

      <p>정가: {pPrice}</p>
      {feature.map((f, i) => (
        <p key={`feature${i}`}>{f}</p>
      ))}
      <p>
        <Link href="/reviews/111">리뷰 더 보기</Link>
      </p>
      <div className="#editor"></div>
    </div>
  );
};

export default ProductDetail;
