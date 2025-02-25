import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "../app/globals.css";

const rubik = Rubik({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AvaTour",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bg" className={rubik.className}>
      <body className="antialiased">{children}</body>
    </html>
  );
}