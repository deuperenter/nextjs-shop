"use client";
import { Options } from "@/types/receivedData";
import ProductOptionsCSS from "./ProductOptions.module.css";
import Image from "next/image";
import {
  permanentRedirect,
  useParams,
  useSearchParams,
  useRouter,
} from "next/navigation";

const ProductOptions = ({ options }: { options: Options | undefined }) => {
  if (!options) {
    return null;
  }

  const { type, ables } = options;

  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const opt = searchParams.get("opt") || ables[0]; // 선택한 옵션 명에서 순서 1번에서 1번, 2번에서 1번 이런 식으로, option
  const lst = searchParams.get("lst") || 0; // 마지막으로 선택한 옵션 // last select

  const possibles = ables.filter((able) => able[+lst] === opt[+lst]);

  // 오류를 방지하기 위해 모든 조합이 가능해도 그걸 전부 배열로 만들기로 했습니다. 더 좋은 방법을 나중에 찾아보셔도 좋습니다.

  if (
    ables.every((able) => able !== opt) ||
    isNaN(+lst) ||
    +lst > opt.length - 1 ||
    0 > +lst
  ) {
    permanentRedirect(`/item/${id}/`);
  }

  function numToChar(num: number) {
    return num < 10 ? "" + num : String.fromCharCode(num + 87);
  }

  const allOptions = [];
  let typeOrder = -1;
  for (const title in type) {
    typeOrder++;
    const someOptions = [];
    let optOrder = -1;

    for (const content of type[title]) {
      optOrder++;
      const charOptOrder = numToChar(optOrder);
      let option;
      let newOpt: string = ables[0];
      let styleClass = "";

      for (const able of ables) {
        if (able[typeOrder] === charOptOrder) {
          newOpt = able;
          styleClass = "not";
          break;
        }
      }
      if (opt[typeOrder] === charOptOrder) {
        newOpt = opt;
        styleClass = "this";
      } else {
        possibles.forEach((possible) => {
          if (possible[typeOrder] === charOptOrder) {
            newOpt = `${opt.substring(
              0,
              typeOrder
            )}${charOptOrder}${opt.substring(typeOrder + 1)}`;
            styleClass = "pos";
          }
        });
      }

      // 값을 복사해서 사용합니다. 그렇게 안 하면 마지막 값이 들어갈 수도 있습니다. 이거 기준으로는 1이 될 수 있습니다.
      const typeOrderCopy = typeOrder;
      if (content instanceof Object) {
        const subTitle = Object.getOwnPropertyNames(content)[0];
        const img = content[subTitle];

        option = (
          <button
            key={subTitle}
            type="button"
            onClick={() =>
              router.push(`/item/${id}?opt=${newOpt}&lst=${typeOrderCopy}`, {
                scroll: false,
              })
            }
          >
            <Image
              key={`optionImg${subTitle}`}
              src={img}
              alt={`${title}${subTitle}`}
              width={65}
              height={65}
              className={`${ProductOptionsCSS.imgBtn} ${
                styleClass === "this"
                  ? ProductOptionsCSS.this
                  : styleClass === "pos"
                  ? ProductOptionsCSS.pos
                  : ProductOptionsCSS.not
              }`}
            />
            <div>{subTitle}</div>
          </button>
        );
      } else {
        option = (
          <button
            key={content}
            type="button"
            onClick={() =>
              router.push(`/item/${id}?opt=${newOpt}&lst=${typeOrderCopy}`, {
                scroll: false,
              })
            }
            className={`${ProductOptionsCSS.textBtn} ${
              styleClass === "this"
                ? ProductOptionsCSS.this
                : styleClass === "pos"
                ? ProductOptionsCSS.pos
                : ProductOptionsCSS.not
            }`}
          >
            {content}
          </button>
        );
      }
      someOptions.push(option);
    }
    allOptions.push(someOptions);
  }

  return allOptions.map((o, i) => (
    <div className={ProductOptionsCSS.options} key={`optionType${i}`}>
      {o}
    </div>
  ));
};

export default ProductOptions;
