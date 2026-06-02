import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "Standby — Meet someone before boarding.",
  description:
    "Standby turns airport downtime into one curated introduction with someone nearby before the moment disappears.",
  openGraph: {
    title: "Standby — Meet someone before boarding.",
    description:
      "Standby turns airport downtime into one curated introduction with someone nearby before the moment disappears.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sora.variable}>
      <body>{children}</body>
    </html>
  );
}
