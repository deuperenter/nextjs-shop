import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainContent from "@/components/common/MainContent";

import { config } from "@fortawesome/fontawesome-svg-core";

import "@fortawesome/fontawesome-svg-core/styles.css";
import StoreProvider from "./StoreProvider";
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
          <MainContent>{children}</MainContent>
        </body>
      </html>
    </StoreProvider>
  );
}
