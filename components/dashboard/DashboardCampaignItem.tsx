"use client";
import { ABI } from "@/abi/relief-finance";
import { AuthContext } from "@/context/AuthContext";
import { RWA_ADDRESS } from "@/context/provider/rainbow-kit";
import { allowedAdminEmails } from "@/public/data/data";
import { GetAllCampaigns } from "@/types/GetAllCampaignProposals";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import { useAccount, useWriteContract } from "wagmi";

interface DashboardItemProps {
  progress: number;
  campaign: GetAllCampaigns;
}

const DashboardCampaignItem: React.FC<DashboardItemProps> = ({
  progress,
  campaign,
}) => {
  const { currentUser } = useContext(AuthContext);
  const { isConnected } = useAccount();

  // Approve campaign
  const {
    writeContract: approveCampaign,
    isPending: isApproving,
    isError,
    error,
  } = useWriteContract();

  // Complet campaign
  const {
    writeContract: completeCampaign,
    isPending: isCompletingCampaign,
    isError: isCompleteCampaignError,
    error: completeCampaignError,
  } = useWriteContract();

  const handleApproveCampaign = async (campaignId: number) => {
    try {
      await approveCampaign({
        chainId: 42421,
        abi: ABI,
        address: RWA_ADDRESS,
        functionName: "approveCampaign",
        args: [campaignId],
      });
      if (isApproving) {
        toast.success("Approving campaign...");
      } else if (isError) {
        toast.error(`${error?.message}`);
      }
    } catch (error) {
      toast.error("Error approving campaign!");
    }
  };

  const handleCompleteCampaign = async (campaignId: number) => {
    try {
      await approveCampaign({
        chainId: 42421,
        abi: ABI,
        address: RWA_ADDRESS,
        functionName: "completeCampaign",
        args: [campaignId],
      });
      if (isApproving) {
        toast.success("Completing campaign...");
      } else if (isError) {
        toast.error(`${error?.message}`);
      }
    } catch (error) {
      toast.error("Error completing campaign!");
    }
  };

  return (
    <div
      key={campaign.id}
      className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{campaign.title}</h2>
          <p className="text-sm text-gray-500">
            Owner:{" "}
            <span className="font-medium text-gray-700">
              {currentUser?.displayName || "Anonymous"}
            </span>
          </p>
          <p
            className="text-xs text-gray-400 mt-1 overflow-hidden text-ellipsis"
            style={{ height: "50px" }}
          >
            {campaign.description.length > 100
              ? `${campaign.description.substring(0, 150)}...`
              : campaign.description}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex flex-row items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Goal Amount</p>
            <p className="text-lg font-semibold text-teal-600">
              {campaign.goal} RWA
            </p>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {campaign?.deadline?.toLocaleDateString()}
          </p>
        </div>
        <div className="relative mt-3 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="mt-2 text-right text-sm text-gray-600">
          {Math.round(progress)}% funded
        </p>
      </div>

      {isConnected &&
      currentUser?.email &&
      allowedAdminEmails.includes(currentUser.email) ? (
        <button
          className={`text-white text-sm px-5 py-2 mt-3 rounded-full shadow-md transition-colors duration-300 w-full ${
            campaign?.isApproved
              ? "bg-gray-400"
              : "bg-teal-500 hover:bg-teal-600"
          }`}
          onClick={() => handleApproveCampaign(campaign.id)}
          disabled={isApproving || campaign?.isApproved}
        >
          {isApproving
            ? "Approving..."
            : campaign?.isApproved
            ? "Approved"
            : "Approve Campaign"}
        </button>
      ) : (
        <button
          className={`text-white text-sm px-5 py-2 mt-3 rounded-full shadow-md transition-colors duration-300 w-full ${
            campaign?.isApproved
              ? "bg-gray-400"
              : "bg-teal-500 hover:bg-teal-600"
          }`}
          onClick={() => handleCompleteCampaign(campaign.id)}
          disabled={isCompletingCampaign || campaign.isCompleted}
        >
          {isCompletingCampaign
            ? "Finalising..."
            : campaign?.isCompleted
            ? "Completed"
            : "Complete Campaign"}
        </button>
      )}
    </div>
  );
};

export default DashboardCampaignItem;
