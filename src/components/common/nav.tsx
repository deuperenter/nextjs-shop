"use client";
import Image from "next/image";
import Link from "next/link";
import NavCSS from "./Nav.module.css";
import SearchBar from "./SearchBar";
import SelectCtry from "./SelectCtry";
import CategoryList from "./CategoryList";
import { useRef, useState } from "react";
import { refArray } from "@/lib/utils";

export default function Nav() {
  const [openList, setOpenList] = useState(false);
  const categoryRef = useRef<(Element | null)[]>([]);
  const selectCtryRef = useRef<(HTMLElement | null)[]>([]);

  return (
    <nav className={NavCSS.bar}>
      <div className={NavCSS.menus}>
        <Link href="/">
          <Image
            src="/enterdeuper_logo.svg"
            alt="logo_img"
            width={50}
            height={50}
          />
        </Link>
        <button
          onClick={() => setOpenList(!openList)}
          className={NavCSS.menu}
          ref={(el) => refArray<Element>(el, categoryRef)}
        >
          카테고리
        </button>
        <CategoryList
          openList={openList}
          setOpenList={setOpenList}
          categoryRef={categoryRef}
        />

        <SearchBar />
        <SelectCtry selectCtryRef={selectCtryRef} />
      </div>
    </nav>
  );
}
