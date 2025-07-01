import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "../components/common/Nav";
import Footer from "../components/common/Footer";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import StoreProvider from "./StoreProvider";
config.autoAddCss = false;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Enterdeuper Shop",
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
          <Nav />
          <div id="main-container">
            <div className="main">{children}</div>
            <Footer />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
