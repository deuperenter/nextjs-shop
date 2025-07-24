"use client";
import { fetchCurrency } from "@/lib/features/currency/currency";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import { useEffect, useRef, useState } from "react";

const MainComponent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [showMain, setShowMain] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const { fulfilled } = useAppSelector((state) => state.currency.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (fulfilled) {
      setShowMain(true);
    } else {
      dispatch(fetchCurrency());
    }
  }, [fulfilled]);

  useEffect(() => {
    const scrollPosition = localStorage.getItem("scrollPosition");

    if (
      scrollPosition &&
      window.location.href === scrollPosition.split(".")[0]
    ) {
      window.scrollTo(0, parseInt(scrollPosition.split(".")[1]));
    }
    const saveScrollPosition = () => {
      localStorage.setItem(
        "scrollPosition",
        window.location.href + "." + window.scrollY
      );
    };

    window.addEventListener("scroll", saveScrollPosition);
  });

  return (
    <div className={showMain ? "show" : "hide"} ref={mainRef}>
      {children}
    </div>
  );
};

export default MainComponent;
