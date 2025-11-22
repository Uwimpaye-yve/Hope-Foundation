import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hope-Foundation",
  description: "A platform for children struggling with health and education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}