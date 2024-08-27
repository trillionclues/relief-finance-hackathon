"use client";

import "@rainbow-me/rainbowkit/styles.css";

import { type ReactNode } from "react";
import {
  getDefaultConfig,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

import { chains, transports } from "@/config/networks";

const wagmiConfig = getDefaultConfig({
  appName: "Relief Finance",
  projectId: "YOUR_PROJECT_ID",
  chains,
  transports,
  ssr: true,
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
