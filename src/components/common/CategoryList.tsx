import { fetchCategory } from "@/lib/features/category/categorySlice";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import CategoryListCSS from "./CategoryList.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { refArray } from "@/lib/utils";

const CategoryList = ({
  openList,
  setOpenList,
  categoryRef,
}: {
  openList: boolean;
  setOpenList: Dispatch<SetStateAction<boolean>>;
  categoryRef: RefObject<(Element | null)[]>;
}) => {
  const [openSub, setOpenSub] = useState(-1);

  const category: { [k: string]: string[] } = useAppSelector(
    (state) => state.category.value
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCategory());
    window.addEventListener("click", (e) => {
      if (!categoryRef.current.some((c) => c === e.target)) {
        setOpenSub(-1);
        setOpenList(false);
      }
    });
  }, []);

  const titles: string[] = [];
  const subtitles: string[][] = [];

  for (const title in category) {
    titles.push(title);
    subtitles.push(category[title]);
  }

  return (
    <>
      {openList && (
        <div
          className={CategoryListCSS.list}
          ref={(el) => refArray<Element>(el, categoryRef)}
        >
          {openSub !== -1 && (
            <div ref={(el) => refArray<Element>(el, categoryRef)}>
              <div ref={(el) => refArray<Element>(el, categoryRef)}>
                <button
                  ref={(el) => refArray<Element>(el, categoryRef)}
                  onClick={() => setOpenSub(-1)}
                  className="font20"
                >
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    ref={(el) => refArray<Element>(el, categoryRef)}
                  />
                  Back To Main
                </button>
              </div>
              {subtitles[openSub].map((s) => {
                return (
                  <div ref={(el) => refArray<Element>(el, categoryRef)} key={s}>
                    <Link
                      ref={(el) => refArray<Element>(el, categoryRef)}
                      href={`/items/${s === "All" ? titles[openSub] : s}`}
                      className="font20"
                      onClick={() => {
                        setOpenList(false);
                        setOpenSub(-1);
                      }}
                    >
                      {s}
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
          {openSub === -1 &&
            titles.map((t, i) => (
              <div ref={(el) => refArray<Element>(el, categoryRef)} key={t}>
                <button
                  ref={(el) => refArray<Element>(el, categoryRef)}
                  className="font20"
                  onClick={() => setOpenSub(i)}
                >
                  {t}
                </button>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default CategoryList;
