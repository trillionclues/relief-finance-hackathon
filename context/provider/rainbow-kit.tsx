"use client";

import "@rainbow-me/rainbowkit/styles.css";
import { type ReactNode } from "react";
import { lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createConfig, http, WagmiProvider } from "wagmi";

import {
  mainnet,
  sepolia,
  polygonAmoy,
  polygon,
  optimism,
  arbitrum,
  zora,
  goerli,
  arbitrumSepolia,
  base,
  baseSepolia,
  gnosis,
  gnosisChiado,
  hardhat,
} from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  ssr: true,
  connectors: [injected()],
  chains: [
    mainnet,
    sepolia,
    polygonAmoy,
    polygon,
    optimism,
    arbitrum,
    zora,
    goerli,
    arbitrumSepolia,
    base,
    baseSepolia,
    gnosis,
    gnosisChiado,
    hardhat,
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygonAmoy.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
    [zora.id]: http(),
    [goerli.id]: http(),
    [arbitrumSepolia.id]: http(),
    [base.id]: http(),
    [baseSepolia.id]: http(),
    [gnosis.id]: http(),
    [gnosisChiado.id]: http(),
    [hardhat.id]: http(),
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
