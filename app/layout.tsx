import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = {
  title: "Standby — Start chasing serendipity.",
  description:
    "Airports are the world's greatest hub of talent. Standby builds the infrastructure for the right introduction at the right moment.",
  openGraph: {
    title: "Standby — Start chasing serendipity.",
    description:
      "Airports are the world's greatest hub of talent. Standby builds the infrastructure for the right introduction at the right moment.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={openSans.variable}>
      <body>{children}</body>
    </html>
  );
}
