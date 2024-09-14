"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { type ReactNode } from "react";
import {
  connectorsForWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  phantomWallet,
  walletConnectWallet,
  safepalWallet,
  trustWallet,
  coinbaseWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http, WagmiProvider } from "wagmi";

import { mainnet, sepolia, polygonAmoy, polygon } from "wagmi/chains";
export const CONTRACT_ADDRESS = "0xD2261182E1DD8928Bdea08d7AFeD0855d3BEE8c2";
export const RWA_ADDRESS = "0x1b52A32F682E2D59FcA9dC2A60bBA04e286A7C3c";
import { defineChain } from "viem";

export const assetchain = defineChain({
  id: 42421,
  name: "AssetChain",
  nativeCurrency: { name: "Assetchain", symbol: "RWA", decimals: 9 },
  rpcUrls: {
    default: { http: ["https://enugu-rpc.assetchain.org/"] },
  },
  blockExplorers: {
    default: { name: "Etherscan", url: "https://scan-testnet.assetchain.org/" },
  },
});

const connectors = connectorsForWallets(
  [
    {
      groupName: "Popular",
      wallets: [
        metaMaskWallet,
        phantomWallet,
        coinbaseWallet,
        safepalWallet,
        trustWallet,
        walletConnectWallet,
      ],
    },
  ],
  { appName: "ReliefFinance", projectId: "c3a82c5540f131b916221c47e0b7c637" }
);

export const wagmiConfig = createConfig({
  ssr: true,
  connectors: [...connectors],
  chains: [mainnet, sepolia, polygonAmoy, polygon, assetchain],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygonAmoy.id]: http(),
    [polygon.id]: http(),
    [assetchain.id]: http(),
  },
});

const queryClient = new QueryClient();

export function RainbowKit({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          initialChain={assetchain}
          theme={lightTheme({
            accentColor: "#14b8a6",
            accentColorForeground: "#ffffff",
            overlayBlur: "none",
          })}
          modalSize="wide"
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
