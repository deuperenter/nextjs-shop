"use client";
import { showModal } from "@/lib/features/modal/modalSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLandMineOn } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "@/lib/hook";
import ProductReportCSS from "./ProductReport.module.css";

const ProductReport = ({ pId, seller }: { pId: string; seller: string }) => {
  const dispatch = useAppDispatch();

  return (
    <button
      onClick={() =>
        dispatch(
          showModal({
            value: { report: { pId, seller } },
          })
        )
      }
      className={ProductReportCSS.productReportBtn}
    >
      <FontAwesomeIcon icon={faLandMineOn} />
      상품 또는 판매자 관련 문제 신고
    </button>
  );
};

export default ProductReport;
