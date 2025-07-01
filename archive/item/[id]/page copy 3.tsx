// 나중에 서버 사이드 컴포넌트와 클라이언트 사이드 컴포넌트를 구분해야 한다.
"use client";
import WebEditor from "@/components/common/WebEditor";
import {
  Delivery,
  Detail,
  Options,
  Reviews,
  SubDetails,
} from "@/types/receivedData";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";

const nation: string[] = ["US", "KR", "CA"];
const SelectCtry = ({ ctry, setCtry }) => {
  return (
    <>
      <select
        id="selectCtry"
        onChange={(e) => setCtry(e.target.value)}
        defaultValue={ctry}
      >
        {nation.map((n, i) => (
          <option key={`ctry${i}`}>{n}</option>
        ))}
      </select>
    </>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const searchParam = useSearchParams();

  const [ctry, setCtry] = useState("US");

  // 상품 세부 정보를 담은 객체입니다.
  const detail: Detail = {
    // product id, 상품 아이디, 상품을 구별하기 위해 사용합니다.
    pId: "111",
    // seller name, 판매자 이름입니다. 판매자 이름을 클릭(/seller/deuper)하면 판매자가 판매자는 상품의 목록을 볼 수 있습니다.
    category: ["154", "electronics", "computer", "laptop", "netbook"],
    seller: "deuper",
    // 옵션을 누르면 다른 상품을 보여줍니다. 모든 조합이 다 가능한 것은 아닙니다.
    rating: {
      // 리뷰 개수
      totalRating: 2,
      // 평균 리뷰 점수
      ratingScore: 3.5,
      // 리뷰 점수의 개수: 5점부터 1점
      5: 1,
      4: 0,
      3: 0,
      2: 1,
      1: 0,
    },
    options: {
      // 옵션별로 이름과, 섬네일 이미지 주소가 객체 배열로 있습니다. 섬네일이 없는 경우 배열 타입입니다.
      type: {
        color: [
          { red: "/detail_ex/img_red.png" },
          { blue: "/detail_ex/img_blue.png" },
          { white: "/detail_ex/img_white.png" },
          { black: "/detail_ex/img_black.png" },
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
    pDesc: "상품의 설명입니다.",
    // 사용자 리뷰 배열입니다.
    reviews: {
      // 리뷰 전체를 보여주지 않고 소량의 리뷰만 보여줍니다.
      // 리뷰 내용
      content: [
        {
          // review id: 번호, text: 내용, rating: 평가, rImgs: 리뷰 이미지들, 리뷰 동영상 주소입니다.
          rId: "1",
          uName: "Weight",
          uCtry: "US",
          rTitle: "Good!",
          rText: "Good, It's So Light!",
          rating: 5,
          rImgs: ["/detail_ex/rimg1.png"],
          rDate: "2025-06-28",
          useful: 20,
        },
        {
          rId: "2",
          uName: "Fast",
          uCtry: "KR",
          rTitle: "Bad!",
          rText: "Bad, It's Too Slow!",
          rating: 2,
          rImgs: ["/detail_ex/rimg2.png"],
          rvideo: ["/detail_ex/rvideo1.mp4"],
          rDate: "2025-06-28",
          useful: 10,
        },
      ],
    },
  };

  // 옵션을 선택한 특정 상품에 해당하는 내용입니다.
  const subDetails: SubDetails = {
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
    // product country, 상품 국가, 쇼핑몰에서 적용하고 있는 환율을 기준으로 금액을 변환하는 데 사용합니다. 실시간 환율과 차이가 있을 수 있습니다.
    pCtry: "KR",
    // 할인율
    discount: 25,
    // 상품의 재고입니다. 1000개를 다 살 수 있는 게 아니라 일반 소비자인 경우 최대 30개까지 수량을 선택할 수 있도록 해야 합니다.
    stock: 1000,
    // (상품의) 특징, slate.js에서 사용하는 형식입니다.
    feature: `[{"type":"paragraph","children":[{"text":"Portable: 어느 곳에서나 사용할 수 있습니다."}]},{"type":"paragraph","children":[{"text":"Storage: 용랑이 큰 SSD로 용랑이 큰 게임을 설치할 수 있습니다."}]}]`,
    // product info, 상품 정보입니다. slate.js에서 사용하는 형식입니다.
    pInfo: `[{"type":"paragraph","children":[{"text":"tech Detail"}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":"Summary"}]},{"type":"paragraph","children":[{"text":"Display: 14 inches"}]},{"type":"paragraph","children":[{"text":"Resolution: 1920 x 1080 Pixles"}]},{"type":"paragraph","children":[{"text":"생략: 예시이기 때문에 이 정도까지만 하겠습니다."}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":"etc"}]},{"type":"paragraph","children":[{"text":"Brand: EnterDeuper"}]},{"type":"paragraph","children":[{"text":"Hardware Platform: PC"}]},{"type":"paragraph","children":[{"text":""}]},{"type":"paragraph","children":[{"text":"additional info"}]},{"type":"paragraph","children":[{"text":"regestration date: 2025-06-27"}]}]`,
    // 위 제품과 비슷한 상품 목록이나, 사용자의 쇼핑몰 데이터 기반으로 상품 목록을 보여주는 것은 데이터를 만들기 힘들기 때문에 제외했습니다.
  };

  // 특정 상품의 배송과 관련된 내용입니다.
  const delivery: Delivery = {
    // delivery fee, 배송비, 구매자가 지정한 국가를 기준으로 배송비를 산정한 금액입니다. 상품의 위치와 배송지의 거리를 기준으로 요금이 달라집니다. 사용자가 배송지를 바꿀 때마다 데이터를 요청해서 조건에 맞는 데이터를 가져옵니다.
    dFee: 100000,
    // Delivery Date,
    dDate: "2025-07-07",
    // Import Charge, 관세라는 뜻입니다. 다른 나라에서 물건이 올 경우 매기는 세금입니다.
    dImpCharge: 30000,
    // 배송 가능한 나라입니다. 배송이 불가능한 경우 이전 값을 그대로 유지하고 구매할 수 없다고 알려야 합니다.
    ableCtry: ["US", "CA", "KR"],
  };

  // 객체 구조 분해 할당
  const { pId, seller, options, fromSelImg, pDesc, reviews } = detail;
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

  // 화폐 단위나 환율 계산
  // current country: 현재 국가, 이것은 사용자가 설정한 값이나, ip 주소를 통해 알아낸 값입니다.

  // console.log(localStorage.getItem("ctry"));

  const monUnitChart: { [k: string]: string }[] = [
    { US: "$" },
    { KR: "₩" },
    { CA: "$" },
  ];

  // 나중에 타입 한 번에 추출할 것입니다.
  function monUnitSymbol(cCtry: string) {
    for (const monUnit of monUnitChart) {
      if (monUnit[cCtry]) {
        return monUnit[cCtry];
      }
    }
  }

  // 현재 화폐 단위: 사이트에서 설정한 국가를 기준한다. 합니다.
  const cMonUnit = monUnitSymbol(ctry);

  // 배송비 관련된 내용은 상품을 판매하는 국가를 기준으로 합니다.

  // 환율은 미국 1달러 기준입니다. 환율은 나중에 API를 통해서 받아오면 됩니다.
  const exchangeRates: { [k: string]: number }[] = [
    { US: 1 },
    { KR: 1350 },
    { CA: 1.37 },
  ];

  // 환율을 구하는 함수입니다.
  function exchangePriceCallback(pCtry: string, cCtry: string) {
    if (pCtry === cCtry) {
      return function (pPrice: number) {
        return pPrice;
      };
    }

    let pCtryPrice: number = 0;
    let cCtryPrice: number = 0;
    for (const exchangeRate of exchangeRates) {
      if (exchangeRate[pCtry]) {
        pCtryPrice = exchangeRate[pCtry];
      }

      if (exchangeRate[cCtry]) {
        cCtryPrice = exchangeRate[cCtry];
      }
    }
    if (cCtryPrice && pCtryPrice) {
      return function (pPrice: number) {
        // 소수점을 쓰는 나라인 경우 소수점 2자리 표기
        if (["US", "CA"].includes(cCtry)) {
          return Math.ceil(((pPrice * cCtryPrice) / pCtryPrice) * 100) / 100;
        }
        return Math.ceil((pPrice * cCtryPrice) / pCtryPrice);
      };
    } else {
      throw new Error("상품의 국가 표기가 잘못됐습니다.");
    }
  }

  // 함수 API를 사용하면 exchangeRates와 exchangeRate는 함수 API로 대체됩니다.
  const exchangePrice = exchangePriceCallback(pCtry, ctry);

  const discountPrice = discount
    ? Math.ceil((exchangePrice(pPrice) * (100 - discount)) / 100)
    : exchangePrice(pPrice);

  // 출력할 내용을 반환하는 함수
  function showStock(stock: number) {
    if (!stock) {
      return <p>재고 없음</p>;
    }
    const selection = [];
    for (let i = 1; i <= stock && i <= 30; i++) {
      selection.push(<option key={`stock${i}`}>{i}</option>);
    }
    return (
      <p>
        수량: <select id="stock">{selection}</select>
      </p>
    );
  }

  function printOptions(options: Options) {
    const { type, able } = options;
    // Dell 방식은 없는 값이면 다른 타입의 가장 첫 번째 값으로 변경하는 방식이다.
    // Amazon 방식은 조합 중에서 사용가능한 조합을 보여주는 방식이다. red를 클릭했을 때 가능한 조합, 500GB를 클릭했을 때 가능한 조합 이런 식으로 말이다.
    // 근데 생각해보니 비슷한 방식이다. Dell도 옵션 항목을 없애지 않을 뿐이다. Amazon 모니터 항목 들어가보고 알았다.
    // 자잘한 옵션을 바꾸는 것은 허용 근데. 아예 다른 제품으로 이동하는 건 지양: 모니터는 안 됨. 식기대 크기, 색상 바꾸는 것은 가능
    // 우선순위는 사용자가 정하는 것이다.
    // const amount = "0123456789abcdefghijklmnopqrstuvwxyz"; // 한 타입이 35가지 경우가 가능하다. chatAt를 쓸 수도?
    // console.log(able);
    const opt = searchParam.get("opt") || "00"; // 선택한 옵션 명에서 순서 1번에서 1번, 2번에서 1번 이런 식으로, option
    const lst = searchParam.get("lst") || "0"; // 마지막으로 선택한 옵션 // last select
    // 사용자가 커스텀하게 진짜 원하는 옵션은 존재하지 않을 수 있다. 이걸 어떻게 할 수는 없다. 색깔과 용랑 중에서 포기를 해야 한다.
    // 옵션을 선택하는 데 옵션이 없으면 "가능한 옵션" 띄우기
    // 옵션이 없는 거랑 재고가 없는 거랑 별개이다. 재고가 없으면 눌렀을 때 재고 없음이 뜬다.
    // 사실 이 방법이 가장 간단한 것이다.

    // [ "00", "01", "02", "10", "11", "20", "30" ]

    // 버튼 링크: 존재하지 않는 경우 "", 있는 경우 번호 표기
    // able의 형태와 sid와 생각을 좀 하자
    // 선택된 옵션도 알아야 한다. 선택된 옵션 1개를 기준으로 가능한 옵션을 표기. 선택됨 옵션: 02, 12 - 가능 옵션과 다르다. 첫 번째 옵션에서 3번째, 두 번째 옵션에서 3번째 | 가능은: 첫 번째 옵션 첫 번째와 두 번째 옵션 세 번째를 선택. 기본 값은 첫 번째 옵션의 첫 번째
    // console.log("opt", opt);
    // console.log("lst", lst);
    // console.log("0001".indexOf("1"));
    // console.log(lst.indexOf("1"));
    // console.log(11, opt[lst.indexOf("1")]);
    const possible = able.filter((e) => e[lst] === opt[lst]);

    // 시나리오: 우연히 첫 상품을 선택 opt=00&lst=0
    // 가능한 옵션 00, 01, 02

    // 옵션이 3개인 경우 이거 초과는 너무 과하다.

    const allOptions = [];
    let digit = -1;
    console.log(able);
    for (const title in type) {
      digit++;
      const someOptions = [];
      let optOrder = -1;

      for (const content of type[title]) {
        optOrder++;
        let option;
        let newOpt;
        let check = "";
        for (const a of able) {
          if (a[digit] === `${optOrder}`) {
            newOpt = a;
            break;
          }
        }
        if (opt[digit] === `${optOrder}`) {
          newOpt = opt;
          check += "this";
        } else {
          possible.forEach((p) => {
            if (p[digit] === `${optOrder}`) {
              check += "pos";
              newOpt = `${opt.substring(0, digit)}${optOrder}${opt.substring(
                digit + 1
              )}`;
            }
          });
        }
        if (content instanceof Object) {
          const subTitle = Object.getOwnPropertyNames(content)[0];
          const img = content[subTitle];
          option = (
            <Link
              key={subTitle}
              href={`/item/${id}?opt=${newOpt}&lst=${digit}`}
            >
              <button key={subTitle}>
                <Image
                  key={`optionImg${subTitle}`}
                  src={img}
                  alt={`${title}${subTitle}`}
                  width={65}
                  height={65}
                />
                <div>{check}</div>
                <div>{subTitle}</div>
              </button>
            </Link>
          );
        } else {
          option = (
            <Link key={content} href={`/item/${id}?opt=${newOpt}&lst=${digit}`}>
              <button key={content}>
                <div>{check}</div>
                {content}
              </button>
            </Link>
          );
        }
        someOptions.push(option);
      }
      allOptions.push(someOptions);
    }
    return allOptions.map((o, i) => <div key={`optionType${i}`}>{o}</div>);
  }

  function printReviews(reviews: Reviews) {
    return reviews.content.map((c) => {
      const { rId, rText, rating, rImgs, rvideo } = c;
      return (
        <div key={rId}>
          <div>{rating}</div>
          <div>{rText}</div>
          {rImgs?.map((img, i) => (
            <Image
              key={`rImage${i}`}
              alt={`reviewImg${i}`}
              src={img}
              width={250}
              height={250}
            />
          ))}
          {rvideo && (
            <video width={320} height={320} controls preload="none">
              <source src={rvideo[0]} type="video/mp4" />
            </video>
          )}
        </div>
      );
    });
  }

  function printDelivery(delivery: Delivery) {
    const { dFee, dDate, dImpCharge, ableCtry } = delivery;

    if (!ableCtry.includes("KR")) {
      return "현재 지역은 배송 불가능합니다.";
    }

    return (
      <>
        <p>
          가격: {cMonUnit}
          {discountPrice}
        </p>
        <p>
          배송비: {cMonUnit}
          {exchangePrice(dFee)}
        </p>
        <p>
          관세: {cMonUnit}
          {exchangePrice(dImpCharge)}
        </p>
        <p>
          총합: {cMonUnit}
          {discountPrice + exchangePrice(dFee) + exchangePrice(dImpCharge)}
        </p>
        <p>배송 가능 날짜: {dDate}</p>
      </>
    );
  }

  // 웹 페이지에 출력할 내용
  return (
    <div>
      <SelectCtry ctry={ctry} setCtry={setCtry} />
      <Image src={pImgs[0]} alt="상품 이미지1" width={250} height={250} />
      {pVideo && (
        <video width={320} height={320} controls preload="none">
          <source src={pVideo[0]} type="video/mp4" />
        </video>
      )}
      <p>{pName}</p>
      {options && printOptions(options)}
      <p>{seller}</p>
      <p>
        <Link href={`/seller/${seller}`}>{seller}의 다른 상품 보기</Link>
      </p>
      {discount ? (
        <p>{`-${discount}% ${cMonUnit}${discountPrice}`}</p>
      ) : (
        <p>
          {cMonUnit}${discountPrice}
        </p>
      )}
      {discount && <p>정가: {`${cMonUnit}${exchangePrice(pPrice)}`}</p>}
      {/* 그냥 <Editable readOnly /> 하면 된다. 프리뷰도 필요 없다. */}
      {showStock(stock)}
      <WebEditor editable={true} initial={feature} />
      {printDelivery(delivery)}
      <WebEditor editable={true} initial={pInfo} />
      {fromSelImg?.map((fImg, i) => (
        <Image
          key={`rImage${i}`}
          src={fImg}
          alt="상품 이미지1"
          width={250}
          height={250}
        />
      ))}
      <p>제품 설명</p>
      <p>{pDesc}</p>
      <p>리뷰 보기</p>
      {printReviews(reviews)}
      <p>
        <Link href={`/reviews/${pId}`}>리뷰 더 보기</Link>
      </p>
    </div>
  );
};

export default ProductDetail;
