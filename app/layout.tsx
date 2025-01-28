"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import StoreProvider from "@/app/store/StoreProvider";
import { useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", updateScreenWidth);
    updateScreenWidth();
    return () => {
      window.removeEventListener("resize", updateScreenWidth);
    };
  }, []);

  return (
    <StoreProvider>
      <html lang="en">
 
        <body className={inter.className} id={screenWidth < 500 ? "body" : ""}>
          <Nav />
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}
