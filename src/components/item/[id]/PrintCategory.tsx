import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import PrintCategoryCSS from "./print-category.module.css";
const PrintCaterory = ({ category }: { category: string[] }) => {
  const categoryStr = [];
  for (let i = 0; i < category.length; i++) {
    categoryStr.push(
      <div key={category[i]}>
        <Link className={PrintCategoryCSS.link} href={`/items/${category[i]}`}>
          {category[i]}
        </Link>
      </div>
    );
    if (i === category.length - 1) {
      break;
    }
    categoryStr.push(
      <div key={`arrow${i}`}>
        &nbsp;
        <FontAwesomeIcon
          className={PrintCategoryCSS.arrow}
          icon={faChevronRight}
        />
        &nbsp;
      </div>
    );
  }
  return <div className={PrintCategoryCSS.bar}>{categoryStr}</div>;
};

export default PrintCaterory;
