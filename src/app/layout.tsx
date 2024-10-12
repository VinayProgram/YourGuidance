import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Your Guidance",
  description: "A comprehensive blogging website offering insights and advice on various topics.",
  keywords: "blog, guidance, advice, insights, lifestyle, personal development",
  robots: "index, follow"

};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/bg/Y.png" type="image/x-icon" style={{borderRadius:'500px'}}/>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
