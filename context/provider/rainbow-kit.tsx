"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { type ReactNode } from "react";
import { lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http, WagmiProvider } from "wagmi";

import { mainnet, sepolia, polygonAmoy, polygon } from "wagmi/chains";
import { injected } from "wagmi/connectors";
export const CONTRACT_ADDRESS = "0xD2261182E1DD8928Bdea08d7AFeD0855d3BEE8c2";
export const RWA_ADDRESS = "0xFE66e164002ae5fD1bbB9430f11A8147395B2095";
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
export const wagmiConfig = createConfig({
  ssr: true,
  connectors: [injected()],
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
