import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-logo",
});

export const metadata: Metadata = {
  title: "Café Desire | Fallen Angel Noir Lounge — North Delhi",
  description:
    "A cinematic luxury lounge in Holambi Khurd: pizza, pasta, burgers, momos, shakes, and late-night dining with an elite after-dark atmosphere.",
  keywords: ["Cafe Desire", "Cafe in North Delhi", "Holambi Khurd", "Luxury lounge Delhi", "Pizza Cafe Delhi"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${cinzel.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
