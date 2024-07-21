import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";

const sourceSans3 = Source_Sans_3({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Planner - Organize Your Day & Boost Productivity",
  description:
    "Simplify your life with our easy-to-use task planner. Manage to-do lists, set reminders, and achieve your goals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sourceSans3.className}>{children}</body>
    </html>
  );
}
