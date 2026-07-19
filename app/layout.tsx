import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
});

const siteUrl = "https://the-thirteen.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "The Thirteen",
    template: "%s | The Thirteen",
  },
  description: "A curated visual archive for design references.",
  openGraph: {
    title: "The Thirteen",
    description: "A curated visual archive for design references.",
    url: siteUrl,
    siteName: "The Thirteen",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Thirteen",
    description: "A curated visual archive for design references.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.className}>
      <body>{children}</body>
    </html>
  );
}
