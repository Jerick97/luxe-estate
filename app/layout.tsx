import type { Metadata } from "next";
import localFont from "next/font/local";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const sfPro = localFont({
  src: [
    {
      path: './fonts/SFProDisplay-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/SFProDisplay-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/SFProDisplay-SemiboldItalic.woff2',
      weight: '600',
      style: 'italic',
    },
    {
      path: './fonts/SFProDisplay-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/SFProDisplay-BlackItalic.woff2',
      weight: '900',
      style: 'italic',
    }
  ],
  variable: "--font-sf-pro",
});

export const metadata: Metadata = {
  title: "Luxu Estate Home Discover Screen",
  description: "Find your sanctuary.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sfPro.variable} h-full antialiased`} suppressHydrationWarning>
      <body className={`min-h-full flex flex-col font-display bg-background-light text-nordic-dark`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
