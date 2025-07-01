import { Options } from "@/types/receivedData";
import Image from "next/image";
import { redirect, useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
const PrintOptions = ({ options }: { options: Options }) => {
  const { id } = useParams();
  const searchParam = useSearchParams();
  const { type, able } = options;

  const router = useRouter();

  const opt = searchParam.get("opt") || able[0]; // 선택한 옵션 명에서 순서 1번에서 1번, 2번에서 1번 이런 식으로, option
  const lst = searchParam.get("lst") || 0; // 마지막으로 선택한 옵션 // last select
  const possible = able.filter((e) => e[+lst] === opt[+lst]);

  able.unshift("-");

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
      let newOpt: string;
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
          <button
            key={subTitle}
            type="button"
            onClick={() =>
              router.push(`/item/${id}?opt=${newOpt}&lst=${digit}`, {
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
            />
            <div>{check}</div>
            <div>{subTitle}</div>
          </button>
        );
      } else {
        option = (
          <button
            key={content}
            type="button"
            onClick={() =>
              router.push(`/item/${id}?opt=${newOpt}&lst=${digit}`, {
                scroll: false,
              })
            }
          >
            <div>{check}</div>
            {content}
          </button>
        );
      }
      someOptions.push(option);
    }
    allOptions.push(someOptions);
  }
  return allOptions.map((o, i) => <div key={`optionType${i}`}>{o}</div>);
};

export default PrintOptions;
