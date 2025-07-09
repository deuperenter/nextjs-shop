import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import ProductCategoryCSS from "./ProductCategory.module.css";
const ProductCaterory = ({ category }: { category: string[] }) => {
  const categoryStr = [];
  for (let i = 0; i < category.length; i++) {
    categoryStr.push(
      <div key={category[i]}>
        <Link
          className={ProductCategoryCSS.link}
          href={`/items/${category[i]}`}
        >
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
          className={ProductCategoryCSS.arrow}
          icon={faChevronRight}
        />
        &nbsp;
      </div>
    );
  }
  return <div className={ProductCategoryCSS.bar}>{categoryStr}</div>;
};

export default ProductCaterory;
