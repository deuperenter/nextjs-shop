"use client";
import NavCSS from "./Nav.module.css";
import CategoryListCSS from "./CategoryList.module.css";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { fetchCategory } from "@/lib/features/category/categorySlice";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const CategoryList = () => {
  const [openCategory, setOpenCategory] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  return (
    <>
      <button
        className={NavCSS.menu}
        onClick={() => setOpenCategory(!openCategory)}
      >
        카테고리
      </button>
      {openCategory && (
        <CategoryListContent setOpenCategory={setOpenCategory} />
      )}
    </>
  );
};

const CategoryListContent = ({
  setOpenCategory,
}: {
  setOpenCategory: Dispatch<SetStateAction<boolean>>;
}) => {
  const category = useAppSelector((state) => state.category.value);

  const [openSub, setOpenSub] = useState(-1);
  const categoryRef = useRef<HTMLDivElement>(null);

  const titles: string[] = [];
  const subtitles: string[][] = [];

  for (const title in category) {
    titles.push(title);
    subtitles.push(category[title]);
  }

  const closeCategory = (e: MouseEvent) => {
    if (e.target instanceof Node && !categoryRef.current?.contains(e.target)) {
      setOpenSub(-1);
      setOpenCategory(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeCategory);

    return () => {
      document.removeEventListener("click", closeCategory);
    };
  }, []);

  return (
    <div
      className={`borderDark bgWhite ${CategoryListCSS.list}`}
      ref={categoryRef}
    >
      <div className={`${openSub === -1 ? "show" : "hide"}`}>
        {titles.map((c, i) => (
          <button key={c} className="font20" onClick={() => setOpenSub(i)}>
            {c}
          </button>
        ))}
      </div>
      <div className={`${openSub !== -1 ? "show" : "hide"}`}>
        <button
          className={`font20 ${CategoryListCSS.backBtn}`}
          onClick={() => setOpenSub(-1)}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back To Main
        </button>
        <div className={`font20 ${CategoryListCSS.subtitle}`}>
          {titles[openSub]}
        </div>
      </div>
      {openSub !== -1 &&
        subtitles[openSub].map((s) => (
          <Link
            key={s}
            href={`/items/${s === "All" ? titles[openSub] : s}`}
            onClick={() => {
              setOpenSub(-1);
              setOpenCategory(false);
            }}
          >
            {s}
          </Link>
        ))}
    </div>
  );
};

export default CategoryList;
