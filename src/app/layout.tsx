import type { Metadata } from "next";
import { Roboto_Mono, DM_Mono } from "next/font/google";
import "./globals.css";

const roboto = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const dm = DM_Mono({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Always",
  description: "Track your workouts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dm.className} `}>{children}</body>
    </html>
  );
}
