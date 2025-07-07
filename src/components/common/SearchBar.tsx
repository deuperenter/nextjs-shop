"use client";
import Form from "next/form";
import roundcss from "./round.module.css";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  const searchParam = useSearchParams();
  const query = searchParam.get("q") || "";
  const [word, setWord] = useState(query);

  useEffect(() => {
    setWord(query);
  }, [query]);

  return (
    <>
      <Form action="/s" className={roundcss.searchBar}>
        <div className={`${roundcss.round100} ${roundcss.searchBox}`}>
          <input
            placeholder="EnterDeuver에서 검색하세요"
            name="q"
            className={roundcss.searchInput}
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className={`${roundcss.round100} ${roundcss.bold} ${roundcss.searchBtn} ${roundcss.bgBlue} ${roundcss.fontLight}`}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </Form>
    </>
  );
};
export default SearchBar;
