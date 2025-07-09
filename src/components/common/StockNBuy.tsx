"use client";

import { ChangeEvent, useState } from "react";
import ProductBuy from "./ProductBuy";
import StockNBuyCSS from "./StockNBuy.module.css";

const StockNBuy = ({ stock }: { stock: number }) => {
  const [buy, setBuy] = useState<string | number>(1);
  if (!stock) {
    return <p>재고가 없습니다.</p>;
  }

  function checkStock(e: ChangeEvent<HTMLInputElement>) {
    const stockNum = +e.target.value;
    if (isNaN(stockNum)) {
      setBuy(1);
      return;
    }

    if (stockNum === 0) {
      setBuy("");
      return;
    }

    if (stockNum > 30) {
      setBuy(30);
      return;
    }

    setBuy(stockNum);
  }

  return (
    <>
      <span className={StockNBuyCSS.stockBar}>
        수량: &nbsp;
        <button
          className={StockNBuyCSS.stockBtn}
          onClick={() => setBuy(buy === 1 ? 1 : +buy - 1)}
        >
          -
        </button>
        <input
          type="type"
          value={buy}
          onChange={checkStock}
          onBlur={(e) => setBuy(+e.target.value === 0 ? 1 : +e.target.value)}
        />
        <button
          className={StockNBuyCSS.stockBtn}
          onClick={() => setBuy(buy === 30 ? 30 : +buy + 1)}
        >
          +
        </button>
      </span>
      <ProductBuy buy={buy} />
    </>
  );
};

export default StockNBuy;
