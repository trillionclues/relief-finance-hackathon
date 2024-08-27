"use client";

import { ReactNode } from "react";

import { useIsMounted } from "@/lib/hooks/use-is-mounted";
import { RainbowKit } from "./rainbow-kit";

interface RootProviderProps {
  children: ReactNode;
}

export default function RootProvider({ children }: RootProviderProps) {
  const isMounted = useIsMounted();
  return isMounted ? <RainbowKit>{children}</RainbowKit> : null;
}
