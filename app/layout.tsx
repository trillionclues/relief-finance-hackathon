import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import RootProvider from "@/context/provider/root-reducer";
import { ModalContextProvider } from "@/lib/utils/ModalContext";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Relief Finance",
  description:
    "Relief Finance is a decentralized platform to fund critical humanitarian campaigns using crypto wallets and Web3 technologies.",
  keywords: [
    "Relief Finance",
    "decentralized crowdfunding",
    "crypto donations",
    "blockchain",
    "web3",
    "humanitarian aid",
  ],
  authors: [
    {
      name: "Excel Nwachukwu -Trillionclues",
      url: "https://twitter.com/trillionclues",
    },
  ],
  openGraph: {
    title: "Relief Finance - Decentralized Crowdfunding",
    description:
      "Support critical humanitarian causes via decentralized finance and Web3 technology.",
    // images: "/opengraph-image.png", // Add your open graph image for better SEO
    url: "https://relief-finance.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>
        <AuthProvider>
          <RootProvider>
            <ModalContextProvider>{children}</ModalContextProvider>
          </RootProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
