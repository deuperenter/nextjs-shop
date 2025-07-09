"use client";
import Form from "next/form";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SearchBarCSS from "./SearchBar.module.css";

const SearchBar = () => {
  const searchParam = useSearchParams();
  const query = searchParam.get("q") || "";
  const [word, setWord] = useState(query);

  useEffect(() => {
    setWord(query);
  }, [query]);

  return (
    <>
      <Form action="/s" className={SearchBarCSS.searchBar}>
        <div className={`round100 ${SearchBarCSS.searchBox}`}>
          <input
            placeholder="EnterDeuver에서 검색하세요"
            name="q"
            className={SearchBarCSS.searchInput}
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className={`round100 bold bgBlue fontLight ${SearchBarCSS.searchBtn} `}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </Form>
    </>
  );
};
export default SearchBar;
