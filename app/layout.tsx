import type { Metadata } from "next";
import "./globals.css";
import { satoshi } from "./fonts/font";
import { Navbar } from "@/components/navbar/navbar";

export const metadata: Metadata = {
  title: "Buildooor",
  description: "",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡️</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`relative h-full ${satoshi.className}`}>
          <div className="absolute top-4 w-full flex justify-center">
            <Navbar />
          </div>
          {children}
      </body>
    </html>
  );
}
