"use client";
import { Options } from "@/types/receivedData";
import Image from "next/image";
import { redirect, useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import PrintOptionsCSS from "./PrintOptions.module.css";

const PrintOptions = ({ options }: { options: Options | undefined }) => {
  const { id } = useParams();
  const searchParam = useSearchParams();
  const router = useRouter();

  if (!options) {
    return null;
  }

  const { type, able } = options;

  const opt = searchParam.get("opt") || able[0]; // 선택한 옵션 명에서 순서 1번에서 1번, 2번에서 1번 이런 식으로, option
  const lst = searchParam.get("lst") || 0; // 마지막으로 선택한 옵션 // last select

  const possible = able.filter((e) => e[+lst] === opt[+lst]);

  // 오류 방지 때문에 모든 조합이 가능해도 그걸 전부 배열로 만들기로 했다. 더 좋은 방법이 있는 않은 이상 여기서 더 할 생각은 없다.

  if (
    !able.filter((a) => a === opt).length ||
    isNaN(+lst) ||
    +lst > opt.length - 1
  ) {
    redirect(`/item/${id}/`);
  }

  const allOptions = [];
  let digit = -1;
  for (const title in type) {
    digit++;
    const someOptions = [];
    let optOrder = -1;

    for (const content of type[title]) {
      optOrder++;
      let option;
      let newOpt: string = able[0];
      let styleClass = "";
      // let check = "";
      if (able[0] === "-") {
      } else {
        for (const a of able) {
          if (a[digit] === `${optOrder}`) {
            newOpt = a;
            styleClass = "not";
            break;
          }
        }
        if (opt[digit] === `${optOrder}`) {
          newOpt = opt;
          styleClass = "this";
          // check += "this";
        } else {
          possible.forEach((p) => {
            if (p[digit] === `${optOrder}`) {
              // check += "pos";
              newOpt = `${opt.substring(0, digit)}${optOrder}${opt.substring(
                digit + 1
              )}`;
              styleClass = "pos";
            }
          });
        }
      }
      if (content instanceof Object) {
        const subTitle = Object.getOwnPropertyNames(content)[0];
        const img = content[subTitle];
        // 값을 복사해서 사용하자, 그렇게 안 하면 마지막 값이 들어갈 수도 있다. 이거 기준으로는 1이 될 수 있다.
        const num = digit;
        option = (
          <button
            key={subTitle}
            type="button"
            onClick={() =>
              router.push(`/item/${id}?opt=${newOpt}&lst=${num} `, {
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
              className={`${PrintOptionsCSS.imgBtn} ${
                styleClass === "this"
                  ? PrintOptionsCSS.this
                  : styleClass === "pos"
                  ? PrintOptionsCSS.pos
                  : PrintOptionsCSS.not
              }`}
            />
            {/* <div>{check}</div> */}
            <div>{subTitle}</div>
          </button>
        );
      } else {
        const num = digit;
        option = (
          <button
            key={content}
            type="button"
            onClick={() =>
              router.push(`/item/${id}?opt=${newOpt}&lst=${num}`, {
                scroll: false,
              })
            }
            className={`${PrintOptionsCSS.textBtn} ${
              styleClass === "this"
                ? PrintOptionsCSS.this
                : styleClass === "pos"
                ? PrintOptionsCSS.pos
                : PrintOptionsCSS.not
            }`}
          >
            {content}
            {/* <div>{check}</div> */}
          </button>
        );
      }
      someOptions.push(option);
    }
    allOptions.push(someOptions);
  }
  return allOptions.map((o, i) => (
    <div className={PrintOptionsCSS.options} key={`optionType${i}`}>
      {o}
    </div>
  ));
};

export default PrintOptions;
