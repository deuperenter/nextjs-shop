"use client";
import Image from "next/image";
import navcss from "./nav.module.css";
import Link from "next/link";

import roundcss from "./round.module.css";
import SearchBar from "./SearchBar";
import SelectCtry from "./SelectCtry";

export default function Nav() {
  return (
    <nav className={navcss.bar}>
      <div className={navcss.menus}>
        <Link href="/">
          <Image
            src="/enterdeuper_logo.svg"
            alt="logo_img"
            width={50}
            height={50}
          />
        </Link>
        <button className={roundcss.menu}>카테고리</button>
        <SearchBar />
        <SelectCtry />
      </div>
    </nav>
  );
}
