import Image from "next/image";
import Link from "next/link";
import Form from "next/form";
import NavCSS from "./Nav.module.css";
import SearchBarCSS from "./SearchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import SelectCountry from "./SelectCountry";
import CategoryList from "./CategoryList";

export default function Nav() {
  return (
    <nav className={NavCSS.bar}>
      <div className={NavCSS.menus}>
        <Link href="/">
          <Image
            src="/enterdeuper_logo.svg"
            alt="logo_img_light"
            width={50}
            height={50}
          />
        </Link>
        <CategoryList />
        <Form action="/s" className={SearchBarCSS.searchBar}>
          <div className={`round100 ${SearchBarCSS.searchBox}`}>
            <input
              placeholder="EnterDeuver에서 검색하세요"
              name="q"
              className={SearchBarCSS.searchInput}
            />
          </div>
          <button
            type="submit"
            className={`round100 bold bgBlue fontLight ${SearchBarCSS.searchBtn}`}
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className={SearchBarCSS.searchIcon}
            />
          </button>
        </Form>
        <SelectCountry />
        <Link href="/cart" className={`linkBtn ${NavCSS.cartBtn}`}>
          <FontAwesomeIcon icon={faCartShopping} />
        </Link>
      </div>
    </nav>
  );
}
