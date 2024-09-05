"use client";
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const FundCampaign = () => {
  // const provider = new ethers.BrowserProvider(window.ethereum);
  // const signer = provider.getSigner();
  // const contract = new ethers.Contract(
  //   process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '',
  //   ABI,
  //   signer
  // );

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">💪 Fund this campaign</h2>
      <ConnectButton label="Connect Wallet" />
      <p className="text-xs text-gray-500 mt-4">
        Numbers make the difference in our lives :)
      </p>
    </div>
  );
};

export default FundCampaign;
