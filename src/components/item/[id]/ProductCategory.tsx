import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductCategoryCSS from "./ProductCategory.module.css";
import { Fragment } from "react";
import Link from "next/link";

const ProductCaterory = ({ category }: { category: string[] }) => {
  return (
    <div className={ProductCategoryCSS.bar}>
      {category.map((c, i) => {
        return (
          <Fragment key={`category${i}`}>
            <Link className={ProductCategoryCSS.link} href={`/items/${c}`}>
              {c}
            </Link>
            {i < category.length - 1 && (
              <FontAwesomeIcon
                className={ProductCategoryCSS.arrow}
                icon={faChevronRight}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default ProductCaterory;
