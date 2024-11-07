import type { Metadata } from "next";
import { satoshi } from "./fonts/font";
import "./global.css";
import "@coinbase/onchainkit/styles.css";
import dynamic from "next/dynamic";
import Navbar from "src/components/header/navbar";

const OnchainProviders = dynamic(
  () => import("src/components/OnchainProviders"),
  {
    ssr: false,
  }
);

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`relative h-full ${satoshi.className}`}>
        <OnchainProviders>
          <div className="absolute top-4 w-full flex justify-center">
            <Navbar />
          </div>
          {children}
        </OnchainProviders>
      </body>
    </html>
  );
}
