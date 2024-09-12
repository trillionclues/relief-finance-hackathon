"use client";
import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useWriteContract } from "wagmi";
import { ABI } from "@/abi/relief-finance";
import { RWA_ADDRESS } from "@/context/provider/rainbow-kit";
import { GetSingleCampaignDetails } from "@/types/GetSingleCampaignDetails";
import { toast } from "react-toastify";

const FundCampaign = ({
  campaignDetails,
}: {
  campaignDetails: GetSingleCampaignDetails;
}) => {
  const { isConnected } = useAccount();
  const [donationAmount, setDonationAmount] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // contribute to campaign
  const {
    writeContract: contributeToCampaign,
    data,
    isError,
    error,
    isPending,
    isSuccess,
  } = useWriteContract();

  const handleDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!donationAmount) {
      setErrorMessage("Donation amount must be entered");
      return;
    }

    const parsedAmount = BigInt(parseFloat(donationAmount) * 1e18);

    // Trigger the transaction
    try {
      const result = await contributeToCampaign({
        chainId: 42421,
        abi: ABI,
        address: RWA_ADDRESS,
        functionName: "contribute",
        args: [campaignDetails?.id],
        value: parsedAmount,
      });
      if (isPending) {
        toast.info("Transaction submitted, waiting for confirmation...");
      } else if (isError) {
        toast.error(`${error?.message}`);
      }
    } catch (error: any) {
      toast.error(`Error submitting transaction: ${error.message}`);
    }
  };

  if (isSuccess) {
    toast.success("Transaction successful!");
  }

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-4">💪 Fund this campaign</h2>

      {!isConnected ? (
        <ConnectButton label="Connect Wallet" />
      ) : (
        <>
          <form onSubmit={handleDonation}>
            <div className="mb-4">
              <label
                htmlFor="donation"
                className="block text-sm font-medium text-gray-700"
              >
                Donation Amount (in RWA)
              </label>
              <input
                type="number"
                id="donation"
                name="donation"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                step="0.01"
                min="0"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                required
              />
            </div>

            {errorMessage && (
              <p className="text-red-600 text-sm">{errorMessage}</p>
            )}

            <button
              type="submit"
              className="w-full bg-teal-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-600 transition duration-300"
              disabled={isPending || !donationAmount}
            >
              {isPending ? "Processing..." : "Fund Campaign"}
            </button>
          </form>

          {isSuccess && (
            <p className="mt-4 text-green-600">Thank you for your donation!</p>
          )}

          {error && (
            <p className="mt-4 text-red-600">
              An error occurred: {error.message}
            </p>
          )}
        </>
      )}

      <p className="text-xs text-gray-500 mt-4">
        Numbers make the difference in our lives :)
      </p>
    </div>
  );
};

export default FundCampaign;
