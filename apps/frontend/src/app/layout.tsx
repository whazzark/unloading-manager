import React from "react";

import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "@/components/atoms";

import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "Unloading Manager",
  description: "Generated by create next app",
};

export default function RootLayout(props: PropsWithChildren) {
  const { children } = props;

  return (
    <ClerkProvider>
      <html lang="en" className="flex h-screen">
        <body suppressHydrationWarning={true} className="flex flex-1 flex-col">
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
