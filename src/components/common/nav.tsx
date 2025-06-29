import Image from "next/image";
import navcss from "./nav.module.css";
import Link from "next/link";
import Form from "next/form";
import roundcss from "./round.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

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
        <div className={roundcss.menu}>메뉴</div>
        <Form action="/s" className={roundcss.searchBar}>
          <div className={`${roundcss.round100} ${roundcss.searchBox}`}>
            <input
              placeholder="EnterDeuver에서 검색하세요"
              name="q"
              className={roundcss.searchInput}
            />
          </div>
          <button
            type="submit"
            className={`${roundcss.round100} ${roundcss.bold} ${roundcss.searchBtn} ${roundcss.bgBlue} ${roundcss.fontLight}`}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </Form>
      </div>
    </nav>
  );
}
