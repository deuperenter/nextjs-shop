import { Delivery, Detail, SubDetails } from "@/types/receivedData";
import { NumberObjectArray, StringObjectArray } from "@/types/utils";

export const detailData: Detail = {
  pId: "111",
  category: ["Electronics", "Laptop"],
  seller: "deuper",
  rating: {
    "1": 0,
    "2": 1,
    "3": 0,
    "4": 0,
    "5": 1,
    totalRating: 2,
    ratingScore: 3.5,
  },
  options: {
    type: {
      color: [
        {
          red: "/detail_ex/img_red.png",
        },
        {
          blue: "/detail_ex/img_blue.png",
        },
        {
          white: "/detail_ex/img_white.png",
        },
        {
          black: "/detail_ex/img_black.png",
        },
      ],
      storage: ["500gb SSD", "1tb SSD", "2tb SSD"],
    },
    able: ["00", "01", "02", "10", "11", "20", "30"],
  },
  fromSelImg: [
    "/detail_ex/from_sel_img1.png",
    "/detail_ex/from_sel_img2.png",
    "/detail_ex/from_sel_img3.png",
  ],
  pDesc:
    '[{"type":"paragraph","children":[{"text":"Portable: 어느 곳에서나 사용할 수 있습니다."}]},{"type":"paragraph","children":[{"text":"Storage: 용랑이 큰 SSD로 용랑이 큰 게임을 설치할 수 있습니다."}]}]',
  reviews: {
    content: [
      {
        rId: "1",
        uName: "Weight",
        uProfile: "/detail_ex/profile_1.png",
        uCtry: "US",
        rTitle: "Good!",
        rText: "Good, It's So Light!",
        rating: 5,
        rImgs: ["/detail_ex/rimg1.png"],
        rDate: "2025-06-28",
        rOptions: [
          {
            Color: "Red",
          },
          {
            SSD: "2TB",
          },
        ],
        totalUseful: 20,
        useful: true,
      },
      {
        rId: "2",
        uName: "Speed",
        uProfile: "/detail_ex/profile_1.png",
        uCtry: "KR",
        rTitle: "Bad!",
        rText: "Bad, It's Too Slow!",
        rating: 2,
        rImgs: ["/detail_ex/rimg2.png"],
        rvideo: ["/detail_ex/rvideo1.mp4"],
        rDate: "2025-06-28",
        rOptions: [
          {
            Color: "Blue",
          },
          {
            SSD: "500GB",
          },
        ],
        totalUseful: 10,
        useful: false,
      },
    ],
  },
};

export const subDetailsData: SubDetails = {
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

export const deliveryData: Delivery = {
  // delivery fee, 배송비, 구매자가 지정한 국가를 기준으로 배송비를 산정한 금액입니다. 상품의 위치와 배송지의 거리를 기준으로 요금이 달라집니다. 사용자가 배송지를 바꿀 때마다 데이터를 요청해서 조건에 맞는 데이터를 가져옵니다.
  dFee: 100000,
  // Delivery Date,
  dDate: "2025-07-07",
  // Import Charge, 관세라는 뜻입니다. 다른 나라에서 물건이 올 경우 매기는 세금입니다.
  dImpCharge: 30000,
  // 배송 가능한 나라입니다. 배송이 불가능한 경우 이전 값을 그대로 유지하고 구매할 수 없다고 알려야 합니다.
  ableCtry: ["US", "CA", "KR"],
};

export const monUnitChart: StringObjectArray = [
  { US: "$" },
  { KR: "₩" },
  { CA: "$" },
];

// 환율 API로 대체할 값
export const exchangeRates: NumberObjectArray = [
  { US: 1 },
  { KR: 1350 },
  { CA: 1.37 },
];

export const nation: string[][] = [
  ["US", "United States"],
  ["KR", "Republic Of Korea"],
  ["CA", "Canada"],
];

export const categoryList = [
  {
    Electronics: [
      "Desktop",
      "All-In-Ones",
      "Laptop",
      "Monitor",
      "Tablet",
      "Cell Phones",
      "EBook Reader",
      "Keyboards, Mice",
      "Computer Components & Parts",
      "Cameras",
      "TV",
      "Video Games & Consoles",
      "Virtual Reality",
    ],
    Fashion: [
      "Clothing",
      "Shoes",
      "Jewelry",
      "Watches",
      "Handbags",
      "Accessories",
      "School Uniforms",
    ],
    Books: [
      "Computer Sciences",
      "Information Sciences",
      "Social Sciences",
      "Natural Sciences",
      "Applied Science",
      "Mathematics",
      "Philosophy",
      "Psychology",
      "Religion",
      "Medicine",
      "Sports",
      "Literature",
      "Geography",
      "History",
    ],
    Food: [
      "Pantry",
      "Meat & Seafood",
      "Dairy & Eggs",
      "Frozen",
      "Hot & Ready",
      "Bakery",
      "Cookies",
      "Snacks",
      "Candy",
      "Beverages",
      "Coffee",
      "Alcohol",
      "Organic Foods",
      "Gluten Free Foods",
    ],
    Toys: ["Action Figures & Statues", "Baby Toys", "Dolls", "Puzzles"],
    Kitchin: [
      "Cookware",
      "Bakeware",
      "Bar Tools",
      "Kitchin Storage",
      "Flatware, Knives & Cutlery",
    ],
    "Pets Supplies": [
      "Dogs",
      "Cats",
      "Birds",
      "Insect",
      "Reptiles & Amphibians",
      "Small Animals",
    ],
    Furniture: ["Bed", "Office", "Heating", "Cooling", "Vacuums", "Storage"],
    Motors: [
      "Vehicles",
      "Car & Truck Parts",
      "Wheels & Tires",
      "Motercycle Parts",
      "Other Vehicles Parts",
    ],
    Sport: [
      "Cycling",
      "Fishing",
      "Fitness",
      "Golf",
      "Water Sports",
      "Winter Sports",
    ],
    Office: [
      "Desk organizers",
      "Folders & filing",
      "Paper shredders",
      "Envelopes & mailing supplies",
      "Calendars & planners",
      "Notebooks & pads",
      "Scissors",
      "Whiteboards",
      "Calculators",
      "Staplers",
    ],
  },
];
