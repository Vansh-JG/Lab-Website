import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Venugopal Lab",
    template: "%s | Venugopal Lab",
  },
  description:
    "Venugopal Lab researches innovative biomedical solutions, sharing current projects, publications, and team updates.",
  keywords: [
    "Venugopal Lab",
    "biomedical research",
    "publications",
    "research team",
    "Venugopal",
  ],
  authors: [{ name: "Venugopal Lab" }],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
