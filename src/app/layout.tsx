import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

import Nav from "../components/common/nav/Nav";
import Footer from "../components/common/Footer";
import StoreProvider from "./StoreProvider";
import MainComponent from "@/components/common/MainComponent";
import Modal from "@/components/common/modal/Modal";

export const metadata: Metadata = {
  title: "EnterDeuver Shop",
  description: "Shopping mall with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <MainComponent>
            <Modal />
            <Nav />
            <div id="main-container">
              <main>{children}</main>
              <Footer />
            </div>
          </MainComponent>
        </StoreProvider>
      </body>
    </html>
  );
}
