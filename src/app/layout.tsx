import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainComponent from "@/components/common/Main";

import { config } from "@fortawesome/fontawesome-svg-core";

import "@fortawesome/fontawesome-svg-core/styles.css";
import StoreProvider from "./StoreProvider";
import Nav from "@/components/common/Nav";
import Footer from "@/components/common/Footer";
import Alert from "@/components/common/Alert";

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
    <StoreProvider>
      <html lang="en">
        <body>
          <Alert />
          <MainComponent>{children}</MainComponent>
        </body>
      </html>
    </StoreProvider>
  );
}
