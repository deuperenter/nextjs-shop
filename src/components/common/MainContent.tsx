"use client";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import { useAppDispatch } from "@/lib/store";
import { changeCountry } from "@/lib/features/counter/countrySlice";

const MainContent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeCountry(localStorage.getItem("country") || "US"));
    setShow(true);
  }, []);

  useEffect(() => {
    const scrollPosition = localStorage.getItem("scrollPosition");
    if (
      scrollPosition &&
      window.location.href + "" === scrollPosition.split(".")[0]
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
    <>
      <div className={show ? "show-main" : "hide-main"}>
        <Nav />
        <div id="main-container">
          <main>{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MainContent;
